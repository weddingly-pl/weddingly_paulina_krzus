// app/api/worker-health/route.ts

import { NextRequest } from "next/server";
export const runtime = 'edge';

export async function GET(req: NextRequest) {
  try {
    const resp = await fetch("https://r2-upload-worker-nowy.twoja-strona-slubna.workers.dev/health");
    const text = await resp.text();
    return new Response(text, { status: resp.status });
  } catch (err) {
    return new Response("Worker health check failed", { status: 500 });
  }
}
