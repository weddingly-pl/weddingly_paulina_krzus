// api/r2/presigned-post/route.ts
import { NextRequest } from "next/server";
import { S3Client } from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { bucketMap } from "@/lib/bucketMap";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const file = searchParams.get("file");
  const type = searchParams.get("type") || "application/octet-stream";
  const client = searchParams.get("client") || "testowy";

  if (!file) return Response.json({ error: "Brak parametru ?file" }, { status: 400 });

  const cred = bucketMap[client];
  if (!cred) return Response.json({ error: "Unknown client" }, { status: 400 });

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
    const { url, fields } = await createPresignedPost(s3, {
      Bucket: cred.bucket,
      Key: file,
      Conditions: [
        ["content-length-range", 0, 1024 * 1024 * 1024],  // 1 GB
        ["starts-with", "$Content-Type", ""],             // <-- luźniej
      ],
      Fields: {
        "Content-Type": type,              // ok, ale już nie musi być identyczny co w pliku
        "success_action_status": "201",    // <-- zamiast 204/redirectów dostaniesz 201
      },
      Expires: 3600,
    });

    return Response.json({ url, fields });
  } catch (err) {
    console.error("[PRESIGNED POST ERROR]", err);
    return Response.json({ error: "Presign failed" }, { status: 500 });
  }
}
