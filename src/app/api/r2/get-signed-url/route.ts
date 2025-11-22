import { NextRequest, NextResponse } from "next/server";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { bucketMap } from "@/lib/bucketMap";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const client = searchParams.get("client") || "testowy";
  const file = searchParams.get("file");

  const bucket = bucketMap[client];
  if (!bucket) {
    return NextResponse.json(
      { error: `Nieznany klient: ${client}` },
      { status: 400 }
    );
  }

  if (!file) {
    return NextResponse.json({ error: "Brak parametru file" }, { status: 400 });
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
    // generujemy command do R2 z Content-Disposition → wymusza "pobierz"
    const command = new GetObjectCommand({
      Bucket: bucket.bucket,
      Key: file,
      ResponseContentDisposition: `attachment; filename="${encodeURIComponent(file)}"`,
    });

    // podpisany URL ważny 5 minut
    const signedUrl = await getSignedUrl(s3, command, { expiresIn: 300 });

    // redirect (302) → przeglądarka od razu pobiera z R2, nie przez Vercel
    return NextResponse.redirect(signedUrl, 302);
  } catch (err) {
    console.error("[SIGNED URL ERROR]", err);
    return NextResponse.json(
      { error: "Nie udało się wygenerować signed URL" },
      { status: 500 }
    );
  }
}
