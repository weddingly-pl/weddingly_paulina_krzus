// app/api/r2/presigned-multipart/route.ts
import { NextRequest } from "next/server";
import {
  S3Client,
  CreateMultipartUploadCommand,
  UploadPartCommand,
  CompleteMultipartUploadCommand,
  AbortMultipartUploadCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { bucketMap } from "@/lib/bucketMap";

// Increase the timeout for the S3 client
const s3 = new S3Client({
  region: "auto",
  endpoint: process.env.S3_ENDPOINT!,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
  forcePathStyle: true,
  requestHandler: {
    abortSignal: new AbortController().signal,
    connectionTimeout: 30000, // 30 seconds
    responseTimeout: 30000,    // 30 seconds
  },
});

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const file = searchParams.get("file");
    const type = searchParams.get("type") || "application/octet-stream";
    const client = searchParams.get("client") || "testowy";
    const action = searchParams.get("action");
    const uploadId = searchParams.get("uploadId");
    const partNumber = searchParams.get("partNumber");

    // Better input validation
    if (!file) {
      return Response.json({ error: "Missing file parameter" }, { status: 400 });
    }
    if (!action) {
      return Response.json({ error: "Missing action parameter" }, { status: 400 });
    }

    const cred = bucketMap[client];
    if (!cred) {
      return Response.json({ error: "Invalid client" }, { status: 403 });
    }

    switch (action) {
      case "start": {
        const cmd = new CreateMultipartUploadCommand({
          Bucket: cred.bucket,
          Key: file,
          ContentType: type,
          // Add caching headers
          CacheControl: 'max-age=31536000',
        });
        
        const res = await s3.send(cmd);
        if (!res.UploadId) {
          throw new Error("Failed to create multipart upload");
        }
        
        return Response.json({ uploadId: res.UploadId });
      }

      case "part": {
        if (!uploadId || !partNumber) {
          return Response.json({ 
            error: "Missing uploadId or partNumber" 
          }, { status: 400 });
        }

        const partNum = Number(partNumber);
        if (isNaN(partNum) || partNum < 1 || partNum > 10000) {
          return Response.json({ 
            error: "Invalid part number" 
          }, { status: 400 });
        }

        const cmd = new UploadPartCommand({
          Bucket: cred.bucket,
          Key: file,
          UploadId: uploadId,
          PartNumber: partNum,
        });

        // Shorter expiration time for part uploads
        const url = await getSignedUrl(s3, cmd, { 
          expiresIn: 900 // 15 minutes instead of 1 hour
        });
        
        return Response.json({ url });
      }

      case "abort": {
        if (!uploadId) {
          return Response.json({ 
            error: "Missing uploadId" 
          }, { status: 400 });
        }

        const cmd = new AbortMultipartUploadCommand({
          Bucket: cred.bucket,
          Key: file,
          UploadId: uploadId,
        });
        
        await s3.send(cmd);
        return Response.json({ aborted: true });
      }

      default:
        return Response.json({ 
          error: "Invalid action" 
        }, { status: 400 });
    }
  } catch (err: any) {
    console.error("[MULTIPART GET ERROR]", {
      error: err,
      message: err.message,
      stack: err.stack,
    });
    
    return Response.json({ 
      error: "Upload failed: " + err.message 
    }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const file = searchParams.get("file");
    const client = searchParams.get("client") || "testowy";
    const uploadId = searchParams.get("uploadId");
    const action = searchParams.get("action");

    if (!file || !uploadId || action !== "complete") {
      return Response.json({ 
        error: "Missing required parameters" 
      }, { status: 400 });
    }

    const cred = bucketMap[client];
    if (!cred) {
      return Response.json({ 
        error: "Invalid client" 
      }, { status: 403 });
    }

    const body = await req.json();
    const { parts } = body;

    if (!Array.isArray(parts) || parts.length === 0) {
      return Response.json({ 
        error: "Invalid parts array" 
      }, { status: 400 });
    }

    const cmd = new CompleteMultipartUploadCommand({
      Bucket: cred.bucket,
      Key: file,
      UploadId: uploadId,
      MultipartUpload: { Parts: parts },
    });

    await s3.send(cmd);
    return Response.json({ ok: true });
    
  } catch (err: any) {
    console.error("[MULTIPART COMPLETE ERROR]", {
      error: err,
      message: err.message,
      stack: err.stack,
    });
    
    return Response.json({ 
      error: "Complete failed: " + err.message 
    }, { status: 500 });
  }
}
