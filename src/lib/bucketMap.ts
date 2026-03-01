// lib/bucketMap.ts
// Helper: convert client name to subfolder (testowy → testowy, werka_mati → werka-mati)
export const getSubfolder = (clientName: string): string => {
  if (clientName === "testowy") return "testowy";
  return clientName.replace(/_/g, "-");
};

// Wszystkie dostępne klienty - są mapowani na testowy bucket z subfolderami
const CLIENTS = [
  "paula_przemek"
];

export const bucketMap: Record<string, { bucket: string; endpoint: string }> = {
  testowy: {
    bucket: process.env.NEXT_PUBLIC_R2_BUCKET_NAME_bucket_testowy!,
    endpoint: process.env.NEXT_PUBLIC_R2_LINK_bucket_testowy!,
  },
  // Dynamiczny generator wszystkich other clients
  ...Object.fromEntries(
    CLIENTS.map((client) => [
      client,
      {
        bucket: "testowy",
        endpoint: "https://storage.weddingly.pl",
      },
    ])
  ),
};
