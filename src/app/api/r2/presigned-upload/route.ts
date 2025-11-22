import { NextRequest } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { bucketMap } from "@/lib/bucketMap"; // importujemy mapę

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const file = searchParams.get("file");
  const type = searchParams.get("type") || "application/octet-stream";
  const client = searchParams.get("client") || "testowy"; // Dodaj jeśli chcesz obsługiwać wiele bucketów

  if (!file) {
    return Response.json({ error: "Brak parametru ?file" }, { status: 400 });
  }

  const cred = bucketMap[client];
  if (!cred) {
    return Response.json({ error: "Unknown client" }, { status: 400 });
  }

  const accessKeyId = process.env.R2_ACCESS_KEY_ID!;
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY!;
  const region = "auto";
  
  const s3 = new S3Client({
  region: "auto",
  endpoint: process.env.S3_ENDPOINT!,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
  forcePathStyle: true,
});

    const command = new PutObjectCommand({
      Bucket: cred.bucket,
      Key: file,
      ContentType: type,
    });

  try {
    const url = await getSignedUrl(s3, command, { expiresIn: 120 });
    return Response.json({ url });
  } catch (err: any) {
    console.error("[PRESIGNED ERROR]", err);
    return Response.json({ error: "Presign failed" }, { status: 500 });
  }
}
