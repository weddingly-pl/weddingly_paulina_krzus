import { NextRequest, NextResponse } from "next/server";
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { bucketMap } from "@/lib/bucketMap"; // importujemy mapę

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const client = searchParams.get("client") || "testowy";
  const key = searchParams.get("key");

  if (!key) {
    return NextResponse.json({ error: "Brak parametru key (nazwa pliku)" }, { status: 400 });
  }

  const bucketInfo = bucketMap[client];
  if (!bucketInfo) {
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
    await s3.send(new DeleteObjectCommand({
      Bucket: bucketInfo.bucket,
      Key: key,
    }));
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("[DELETE ERROR]", err);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
