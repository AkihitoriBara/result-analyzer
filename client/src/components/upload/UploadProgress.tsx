"use client";

import { Loader2 } from "lucide-react";

export type UploadPhase = "uploading" | "processing";

type UploadProgressProps = {
  progress: number;
  phase: UploadPhase;
};

export default function UploadProgress({ progress, phase }: UploadProgressProps) {
  const isProcessing = phase === "processing";

  return (
    <div className="rounded-2xl border border-border bg-card p-6 transition-all duration-200">
      <div className="flex items-center justify-between gap-6">
        <div>
          <h2 className="text-lg font-semibold">
            {isProcessing ? "Processing uploaded PDF" : "Uploading PDF"}
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            {isProcessing
              ? "Processing uploaded PDF. Please wait while student records are imported."
              : "Sending the selected PDF to the server."}
          </p>
        </div>

        {isProcessing ? (
          <div className="flex items-center gap-2 text-sm font-medium text-cyan-400">
            <Loader2 className="h-4 w-4 animate-spin" />
            Processing
          </div>
        ) : (
          <span className="text-sm font-medium text-cyan-400">
            {progress}%
          </span>
        )}
      </div>

      {isProcessing ? (
        <div className="mt-5 h-2 overflow-hidden rounded-full bg-muted">
          <div className="h-full w-1/3 animate-pulse rounded-full bg-cyan-500" />
        </div>
      ) : (
        <div className="mt-5 h-2 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-cyan-500 transition-all duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
}
