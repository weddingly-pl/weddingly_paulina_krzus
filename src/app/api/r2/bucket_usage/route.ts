import { NextResponse } from "next/server";
import { bucketMap, getSubfolder } from "@/lib/bucketMap";
import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";

export const runtime = 'nodejs'; // Need nodejs for S3Client

export async function GET(req: Request) {
  const url = new URL(req.url);
  const accountId = process.env.R2_ACCOUNT_ID!;
  const apiToken = process.env.R2_API_TOKEN!;
  
  // bucketName param to client name (from component)
  const clientParam = url.searchParams.get('bucketName');
  
  if (!accountId || !apiToken) {
    return NextResponse.json({ error: "Cloudflare config missing" }, { status: 500 });
  }

  // Get actual bucket name from bucketMap
  // If no client specified, default to testowy
  let actualBucketName = "testowy";
  let subfolder: string | undefined;
  
  if (clientParam) {
    const bucketInfo = bucketMap[clientParam];
    if (bucketInfo) {
      actualBucketName = bucketInfo.bucket;
      // Jeśli mamy klienta, oblicz jego subfolder
      subfolder = getSubfolder(clientParam);
    }
  }

  try {
    // Jeśli mamy subfolder - policz usage ręcznie
    if (subfolder && actualBucketName === "testowy") {
      return await getSubfolderUsage(subfolder);
    }
    
    // Inaczej użyj R2 API dla całego bucketa
    return await getBucketUsage(actualBucketName, accountId, apiToken);
  } catch (e: any) {
    return NextResponse.json({ error: "Request failed", details: e?.message }, { status: 500 });
  }
}

async function getBucketUsage(bucketName: string, accountId: string, apiToken: string) {
  const usageUrl = `https://api.cloudflare.com/client/v4/accounts/${accountId}/r2/buckets/${bucketName}/usage`;

  try {
    const apiRes = await fetch(usageUrl, {
      headers: {
        "Authorization": `Bearer ${apiToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!apiRes.ok) {
      const text = await apiRes.text();
      return NextResponse.json({ error: "Cloudflare API error", details: text }, { status: 500 });
    }

    const data = await apiRes.json();
    if (data.success && data.result) {
      return NextResponse.json({
        size: data.result.payloadSize, // bajty
        objectCount: data.result.objectCount
      });
    }

    return NextResponse.json({ error: "API call failed", details: data }, { status: 500 });
  } catch (e: any) {
    return NextResponse.json({ error: "Request failed", details: e?.message }, { status: 500 });
  }
}

async function getSubfolderUsage(subfolder: string) {
  const s3 = new S3Client({
    region: "auto",
    endpoint: process.env.S3_ENDPOINT!,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID!,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
    },
    forcePathStyle: true,
  });

  try {
    let totalSize = 0;
    let objectCount = 0;
    let continuationToken: string | undefined;

    const prefix = `${subfolder}/`;

    // List all objects w tym subfolderze
    while (true) {
      const command = new ListObjectsV2Command({
        Bucket: "testowy",
        Prefix: prefix,
        MaxKeys: 1000,
        ContinuationToken: continuationToken,
      });

      const response = await s3.send(command);

      if (response.Contents) {
        for (const obj of response.Contents) {
          totalSize += obj.Size || 0;
          objectCount++;
        }
      }

      if (!response.IsTruncated) break;
      continuationToken = response.NextContinuationToken;
    }

    return NextResponse.json({
      size: totalSize,
      objectCount: objectCount,
      subfolder: subfolder
    });
  } catch (e: any) {
    return NextResponse.json({ error: "Failed to calculate subfolder usage", details: e?.message }, { status: 500 });
  }
}
