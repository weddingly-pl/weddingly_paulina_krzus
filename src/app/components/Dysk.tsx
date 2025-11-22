"use client";

import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { ArrowUpTrayIcon, CheckCircleIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

// lazy loader dla NoSleep (CJS) – bez SSR problemów
const getNoSleep = async () => {
  const mod = await import("nosleep.js");
  return new mod.default();
};

export interface DyskProps {
  bucketName: string;
  galleryLink: string;
  workerClientName: string;
  /** Nagłówek nad przyciskiem wyboru plików */
  text1?: string;
  /** Akapit pod nagłówkiem */
  text2?: React.ReactNode;
}

type Status = "pending" | "uploading" | "success" | "error";
type FileUploadStatus = { name: string; status: Status; progress: number; errorMessage?: string };

const MAX_BUCKET_BYTES = 25 * 1024 * 1024 * 1024; // 25 GB
const MAX_FILES_AT_ONCE = 10;
const MAX_FILE_SIZE = 500 * 1024 * 1024; // 500 MB

// --- klasyfikacja i sortowanie ---
const isImage = (f: File) =>
  f.type.startsWith("image/") || /\.(jpe?g|png|gif|webp|heic|heif)$/i.test(f.name);
const isVideo = (f: File) =>
  f.type.startsWith("video/") || /\.(mp4|mov|m4v|webm|avi)$/i.test(f.name);

const priorityRank = (f: File) => (isImage(f) ? 0 : isVideo(f) ? 1 : 2);
const compareByPriority = (a: File, b: File) => {
  const ra = priorityRank(a), rb = priorityRank(b);
  if (ra !== rb) return ra - rb;
  if (a.size !== b.size) return a.size - b.size;
  if (a.name !== b.name) return a.name.localeCompare(b.name);
  return (a as any).lastModified - (b as any).lastModified;
};

// --- XHR PUT z progresem + watchdog 20s (bez retriów wewnątrz) ---
function xhrPutWithProgress(opts: {
  url: string;
  blob: Blob;
  contentType: string;
  timeoutMs: number;
  stallMs?: number;
  onProgress?: (pct: number) => void;
}): Promise<void> {
  const { url, blob, contentType, timeoutMs, stallMs = 20_000, onProgress } = opts;

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    let stallTimer: ReturnType<typeof setTimeout> | null = null;
    let lastPct = -1;

    const arm = () => {
      if (stallTimer) clearTimeout(stallTimer);
      stallTimer = setTimeout(() => xhr.abort(), stallMs);
    };

    xhr.open("PUT", url, true);
    xhr.timeout = Math.max(timeoutMs, 60_000);
    xhr.setRequestHeader("Content-Type", contentType);

    xhr.upload.onloadstart = arm;
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 2 || xhr.readyState === 3) arm();
    };

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable && onProgress) {
        const pct = Math.floor((e.loaded * 100) / e.total);
        if (pct !== lastPct) {
          lastPct = pct;
          onProgress(pct);
          arm();
        }
      }
    };

    xhr.onload    = () => { if (stallTimer) clearTimeout(stallTimer); (xhr.status>=200&&xhr.status<300) ? resolve() : reject(new Error(`HTTP ${xhr.status}`)); };
    xhr.onerror   = () => { if (stallTimer) clearTimeout(stallTimer); reject(new Error("Network error")); };
    xhr.onabort   = () => { if (stallTimer) clearTimeout(stallTimer); reject(new Error("Aborted")); };
    xhr.ontimeout = () => { if (stallTimer) clearTimeout(stallTimer); reject(new Error("Timeout")); };

    arm();
    xhr.send(blob);
  });
}

export default function Dysk({
  bucketName,
  galleryLink,
  workerClientName,
  text1 = "Podziel się wspomnieniami!",
  text2 = "Tutaj możesz łatwo dodać zdjęcia zrobione podczas naszego wesela. Dziękujemy, że dzielicie się z nami tymi chwilami!",
}: DyskProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadStatuses, setUploadStatuses] = useState<Record<string, FileUploadStatus>>({});
  const [isUploading, setIsUploading] = useState(false);
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [bucketUsage, setBucketUsage] = useState<number | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadStatusesRef = useRef(uploadStatuses);
  const isUploadingRef = useRef(isUploading);
  const wakeLockRef = useRef<any>(null);
  const noSleepRef = useRef<any>(null);

  useEffect(() => { uploadStatusesRef.current = uploadStatuses; }, [uploadStatuses]);
  useEffect(() => { isUploadingRef.current = isUploading; }, [isUploading]);

  // podgląd zajętości
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`/api/r2/bucket_usage?bucketName=${bucketName}`);
        const data = await res.json();
        setBucketUsage(Number(data?.size ?? 0));
      } catch { setBucketUsage(null); }
    })();
  }, [bucketName]);

  const orderedSelectedFiles = useMemo(() => [...selectedFiles].sort(compareByPriority), [selectedFiles]);

  // wake lock + NoSleep
  const keepScreenAwake = useCallback(async (on: boolean) => {
    try {
      // @ts-ignore
      const canWL = typeof navigator !== "undefined" && navigator.wakeLock?.request;
      if (on) {
        if (canWL) {
          // @ts-ignore
          wakeLockRef.current = await navigator.wakeLock.request("screen");
        } else {
          if (!noSleepRef.current) noSleepRef.current = await getNoSleep();
          noSleepRef.current.enable();
        }
      } else {
        await wakeLockRef.current?.release();
        wakeLockRef.current = null;
        try { noSleepRef.current?.disable(); } catch {}
      }
    } catch { /* cicho */ }
  }, []);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setGlobalError(null);
    if (!e.target.files) return;

    let newFiles = Array.from(e.target.files);

    if (selectedFiles.length + newFiles.length > MAX_FILES_AT_ONCE) {
      setGlobalError(`Możesz dodać maksymalnie ${MAX_FILES_AT_ONCE} plików na raz!`);
      newFiles = newFiles.slice(0, MAX_FILES_AT_ONCE - selectedFiles.length);
    }

    const tooBig = newFiles.find(f => f.size > MAX_FILE_SIZE);
    if (tooBig) {
      setGlobalError(`Plik "${tooBig.name}" przekracza limit 500 MB.`);
      e.target.value = "";
      return;
    }

    setSelectedFiles(prev => {
      const map = new Map<string, File>();
      for (const f of [...prev, ...newFiles]) if (!map.has(f.name)) map.set(f.name, f);
      return Array.from(map.values());
    });

    setUploadStatuses(prev => {
      const next = { ...prev };
      for (const f of newFiles) if (!next[f.name]) next[f.name] = { name: f.name, status: "pending", progress: 0 };
      return next;
    });

    e.target.value = "";
  }, [selectedFiles]);

  const clearAll = useCallback(() => {
    setSelectedFiles([]);
    setUploadStatuses({});
    setGlobalError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, []);

  const handleUpload = useCallback(async () => {
    setGlobalError(null);

    const statuses = uploadStatusesRef.current;
    const pending = orderedSelectedFiles.filter(f => statuses[f.name]?.status === "pending");

    if (!pending.length || isUploadingRef.current) return;

    if (pending.length > MAX_FILES_AT_ONCE) {
      setGlobalError(`Możesz wysłać maksymalnie ${MAX_FILES_AT_ONCE} plików naraz.`);
      return;
    }
    const tooBig = pending.find(f => f.size > MAX_FILE_SIZE);
    if (tooBig) { setGlobalError(`Plik "${tooBig.name}" przekracza limit 500 MB.`); return; }

    const bytes = pending.reduce((s, f) => s + f.size, 0);
    if (bucketUsage !== null && bucketUsage + bytes > MAX_BUCKET_BYTES) {
      setGlobalError("Brak miejsca w dysku (25 GB).");
      return;
    }

    setIsUploading(true);
    await keepScreenAwake(true);

    for (const file of pending) {
      setUploadStatuses(prev => ({
        ...prev,
        [file.name]: { ...prev[file.name], status: "uploading", progress: 0, errorMessage: undefined },
      }));

      const contentType = file.type || "application/octet-stream";
      const key = `${Date.now()}-${file.name}`;
      const size = file.size;

      let lastErr = "Upload failed";
      const MAX_ATTEMPTS = 3;

      for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
        try {
          const pres = await fetch(
            `/api/r2/presigned-upload?file=${encodeURIComponent(key)}&type=${encodeURIComponent(contentType)}&client=${workerClientName}`,
            { cache: "no-store" }
          );
          if (!pres.ok) throw new Error(`Presign HTTP ${pres.status}`);
          const { url } = await pres.json();

          const seconds = Math.max(60, Math.min(900, Math.ceil(size / (180 * 1024))));

          await xhrPutWithProgress({
            url,
            blob: file,
            contentType,
            timeoutMs: seconds * 1000,
            stallMs: 20_000,
            onProgress: (pct) =>
              setUploadStatuses(prev => ({
                ...prev,
                [file.name]: {
                  ...prev[file.name],
                  status: "uploading",
                  progress: Math.max(10, Math.min(100, Math.floor(10 + 0.9 * pct))),
                },
              })),
          });

          setUploadStatuses(prev => ({
            ...prev,
            [file.name]: { ...prev[file.name], status: "success", progress: 100 },
          }));
          lastErr = "";
          break;
        } catch (e: any) {
          lastErr = String(e?.message || e);
          const retryable =
            /Network|Timeout|Aborted/i.test(lastErr) ||
            /HTTP 5\d\d/.test(lastErr) ||
            /HTTP 429/.test(lastErr) ||
            (/HTTP 403/.test(lastErr) && attempt === 1);

          if (attempt === MAX_ATTEMPTS || !retryable) {
            const msg = `${lastErr}. Proszę wybrać ten plik ponownie.`;
            setUploadStatuses(prev => ({
              ...prev,
              [file.name]: { ...prev[file.name], status: "error", errorMessage: msg },
            }));
          } else {
            const backoff = Math.min(15_000, 1_200 * 2 ** (attempt - 1)) + Math.floor(Math.random() * 300);
            await new Promise(r => setTimeout(r, backoff));
          }
        }
      }
    }

    const anyErr = Object.values(uploadStatusesRef.current).some(s => s.status === "error");
    if (anyErr) {
      const last = [...Object.values(uploadStatusesRef.current)].reverse().find(s => s.status === "error");
      setGlobalError(
        `Część plików nie udało się wysłać.${last?.errorMessage ? ` Szczegóły: ${last.errorMessage}` : ""} ` +
        `Usuń listę i wybierz pliki ponownie.`
      );
    }

    setIsUploading(false);
    await keepScreenAwake(false);
  }, [bucketUsage, keepScreenAwake, orderedSelectedFiles, workerClientName]);

  const hasError = Object.values(uploadStatuses).some(s => s.status === "error");
  const hasSuccess = Object.values(uploadStatuses).some(s => s.status === "success");
  const hasActive = Object.values(uploadStatuses).some(s => s.status === "pending" || s.status === "uploading");
  const canShowClearCompleted = !hasError && !hasActive && hasSuccess;

  return (
    <section id="dysk" className="container mx-auto px-4 py-12 md:py-20 text-center">
      <h2 className="text-4xl md:text-5xl font-serif mb-2 tracking-wide text-gray-800">
        {text1}
      </h2>
      <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
        {text2}
      </p>

      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6 md:p-10 border border-gray-200">
        <input
          type="file"
          multiple
          accept="image/*,video/*"
          onChange={handleFileChange}
          ref={fileInputRef}
          className="hidden"
          disabled={isUploading}
        />

        <div className="flex gap-2 mb-6">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading || selectedFiles.length >= MAX_FILES_AT_ONCE}
            className="flex-1 flex justify-center items-center px-6 py-4 rounded-full border border-[#5c4b45] text-[#5c4b45] hover:bg-[#e8d8c3] hover:text-[#5c4b45] transition duration-200"
          >
            <ArrowUpTrayIcon className="h-6 w-6 mr-2" />
            <span>Kliknij, aby wybrać pliki</span>
          </button>
        </div>

        {Object.keys(uploadStatuses).length > 0 && (
          <div className="mb-6 space-y-3">
            <h3 className="text-left font-semibold text-gray-700">Wybrane pliki:</h3>
            <ul className="max-h-60 overflow-y-auto border rounded-md divide-y divide-gray-200">
              {orderedSelectedFiles.map((file) => {
                const s = uploadStatuses[file.name];
                if (!s) return null;
                return (
                  <li key={s.name} className="px-4 py-3 flex items-center justify-between text-sm">
                    <span className="truncate mr-2 text-[#5c4b45]">{s.name}</span>
                    <div className="flex items-center space-x-2 flex-shrink-0">
                      {s.status === "pending" && <span className="text-[#5c4b45]">Oczekuje</span>}
                      {s.status === "uploading" && (
                        <div className="w-28 bg-gray-200 rounded-full h-2.5" title={`${s.progress || 0}%`}>
                          <div className="h-2.5 rounded-full bg-[#5c4b45]" style={{ width: `${Math.max(2, s.progress || 0)}%` }} />
                        </div>
                      )}
                      {s.status === "success" && <CheckCircleIcon className="h-5 w-5 text-green-500" title="Wysłano" />}
                      {s.status === "error" && <ExclamationCircleIcon className="h-5 w-5 text-red-500" title={s.errorMessage || "Błąd"} />}
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="flex gap-2 justify-end mt-2">
              {hasError ? (
                <button
                  type="button"
                  onClick={clearAll}
                  className="px-3 py-2 text-sm rounded-full border border-red-300 text-red-700 hover:bg-red-50 transition"
                  disabled={isUploading}
                  title="Usuń listę i wybierz pliki ponownie"
                >
                  Wyczyść listę i wybierz ponownie
                </button>
              ) : canShowClearCompleted && selectedFiles.length >= MAX_FILES_AT_ONCE ? (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedFiles(prev => prev.filter(f => uploadStatuses[f.name]?.status !== "success"));
                    setUploadStatuses(prev => {
                      const next: typeof prev = {} as any;
                      for (const s of Object.values(prev)) if (s.status !== "success") (next as any)[s.name] = s;
                      return next;
                    });
                  }}
                  className="px-3 py-2 text-sm rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
                  disabled={isUploading}
                >
                  Prześlij kolejne
                </button>
              ) : null}
            </div>

            {Object.values(uploadStatuses).some(s => s.status === "error" && s.errorMessage) && (
              <div className="mt-2 text-left text-xs text-red-600 space-y-1">
                {Object.values(uploadStatuses)
                  .filter(s => s.status === "error" && s.errorMessage)
                  .map(s => <p key={s.name}><strong>Błąd ({s.name}):</strong> {s.errorMessage}</p>)}
              </div>
            )}
          </div>
        )}

        {globalError && <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-800 rounded-md text-sm">{globalError}</div>}

        <button
          type="button"
          onClick={handleUpload}
          disabled={hasError || !Object.values(uploadStatuses).some(s => s.status === "pending") || isUploading || selectedFiles.length > MAX_FILES_AT_ONCE}
          className="w-full px-6 py-3 rounded-full border border-[#5c4b45] text-[#5c4b45] font-semibold hover:bg-[#e8d8c3] hover:text-[#5c4b45] transition duration-200 disabled:opacity-50"
        >
          {isUploading ? "Wysyłanie..." : `Wyślij (${Object.values(uploadStatuses).filter(s => s.status === "pending").length})`}
        </button>

        <p className="mb-6 text-sm text-gray-500">
          Wysyłaj w partiach do <strong>10 plików</strong>.
        </p>

        <div className="mt-6">
          <Link legacyBehavior href={galleryLink}>
            <a className="inline-block px-6 py-3 text-lg rounded-full border border-[#5c4b45] text-[#5c4b45] hover:bg-[#e8d8c3] hover:text-[#5c4b45] transition duration-200">
              Przejdź do galerii
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
}
