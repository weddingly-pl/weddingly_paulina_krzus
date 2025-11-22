// pages/api/list-images.ts
import { NextRequest, NextResponse } from "next/server";
import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { bucketMap } from "@/lib/bucketMap"; // importujemy mapę

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
    const data = await s3.send(new ListObjectsV2Command({ Bucket: bucket.bucket }));
    const items = data.Contents || [];

    const images = items.map(item => ({
      key: item.Key!,
      url: `${bucket.endpoint}/${item.Key!}`,
    }));

    return NextResponse.json({ images });
  } catch (err: any) {
    console.error("[LIST ERROR]", err);
    return NextResponse.json({ error: "List failed" }, { status: 500 });
  }
}
