import { NextRequest } from 'next/server';
export const runtime = 'edge';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const file = searchParams.get('file');
  let publicEndpoint = searchParams.get('publicEndpoint');

  // Domyślny endpoint z env
  if (!publicEndpoint) {
    publicEndpoint = process.env.R2_PUBLIC_ENDPOINT ?? null;
  }

  if (!file || !publicEndpoint) {
    return new Response(JSON.stringify({ error: "Brak wymaganych parametrów" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const fileUrl = publicEndpoint.replace(/\/$/, '') + '/' + file.replace(/^\//, '');

  try {
    const response = await fetch(fileUrl);
    if (!response.ok) throw new Error("Błąd przy pobieraniu pliku");

    const arrayBuffer = await response.arrayBuffer();
    const contentType = response.headers.get("content-type") || "application/octet-stream";

    return new Response(arrayBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${file}"`,
      },
    });
  } catch (err) {
    console.error("Błąd pobierania pliku:", err);
    return new Response(JSON.stringify({ error: "Nie udało się pobrać pliku" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
