// pages/api/list-images.ts
import { NextRequest, NextResponse } from "next/server";
import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { bucketMap, getSubfolder } from "@/lib/bucketMap";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const client = searchParams.get("client") || "testowy";
  const bucket = bucketMap[client];
  if (!bucket) {
    return NextResponse.json({ error: `Nieznany klient: ${client}` }, { status: 400 });
  }

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
    // Oblicz subfolder z client name
    const subfolder = getSubfolder(client);
    const prefix = `${subfolder}/`;
    
    const data = await s3.send(new ListObjectsV2Command({ 
      Bucket: bucket.bucket,
      Prefix: prefix,
    }));
    const items = data.Contents || [];

    const images = items
      .filter(item => {
        // Pomijaj folder sam w sobie (Keys zwracają obiekty, a nie foldery)
        return item.Key !== prefix;
      })
      .map(item => {
        // Zwracamy pełną ścieżkę (z subfolderem) dla public URL
        return {
          key: item.Key!,
          displayKey: item.Key!.split("/").pop() || item.Key!,
          url: `${bucket.endpoint}/${item.Key!}`,
        };
      });

    return NextResponse.json({ images });
  } catch (err: any) {
    console.error("[LIST ERROR]", err);
    return NextResponse.json({ error: "List failed" }, { status: 500 });
  }
}
