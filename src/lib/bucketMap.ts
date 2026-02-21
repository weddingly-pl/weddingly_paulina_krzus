// lib/bucketMap.ts
export const bucketMap: Record<string, { bucket: string; endpoint: string }> = {
  
      paula_przemek: {
        bucket: process.env.NEXT_PUBLIC_R2_BUCKET_NAME_bucket_paula_przemek!,
        endpoint: process.env.NEXT_PUBLIC_R2_LINK_bucket_paula_przemek!,
      }

};
