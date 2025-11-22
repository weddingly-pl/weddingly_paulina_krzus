"use client";
import Dysk from "../components/Dysk";
import { Suspense } from 'react'
export default function Zaproszenie() {
  return (
    <Suspense>
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Dysk
              bucketName={process.env.NEXT_PUBLIC_R2_BUCKET_NAME_bucket!}
              galleryLink={`/galeria`}
              workerClientName={process.env.NEXT_PUBLIC_UPLOAD_CLIENT_NAME!}
      />
    </div>
    </Suspense>
  );
}
