// lib/bucketMap.ts
export const bucketMap: Record<string, { bucket: string; endpoint: string }> = {
  
      klaudia_darek: {
        bucket: process.env.NEXT_PUBLIC_R2_BUCKET_NAME_bucket_klaudia_darek!,
        endpoint: process.env.NEXT_PUBLIC_R2_LINK_bucket_klaudia_darek!,
      }

};
