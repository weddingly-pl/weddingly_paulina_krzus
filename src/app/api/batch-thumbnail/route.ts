import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const apiUrl = process.env.NEXT_PUBLIC_THUMBNAIL_API_URL;
    const apiUsername = process.env.NEXT_PUBLIC_THUMBNAIL_API_USERNAME;
    const apiPassword = process.env.NEXT_PUBLIC_THUMBNAIL_API_PASSWORD;

    if (!apiUrl || !apiUsername || !apiPassword) {
      return NextResponse.json(
        { error: 'Thumbnail API not configured' },
        { status: 500 }
      );
    }

    const credentials = btoa(`${apiUsername}:${apiPassword}`);
    const response = await fetch(`${apiUrl}/batch-thumbnail`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${credentials}`,
      },
      body: JSON.stringify(body),
    });

    const result = await response.json();

    return NextResponse.json(result, { status: response.status });
  } catch (error) {
    console.error('[BATCH-THUMBNAIL API]', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
