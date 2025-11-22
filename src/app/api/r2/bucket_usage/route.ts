import { NextResponse } from "next/server";
export const runtime = 'edge';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const accountId = process.env.R2_ACCOUNT_ID!;
  const bucketName = url.searchParams.get('bucketName') || process.env.R2_BUCKET_NAME;
  const apiToken = process.env.R2_API_TOKEN!;

  if (!accountId || !bucketName || !apiToken) {
    return NextResponse.json({ error: "Cloudflare config missing" }, { status: 500 });
  }

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
    console.log("Cloudflare R2 usage API response:", data);
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
