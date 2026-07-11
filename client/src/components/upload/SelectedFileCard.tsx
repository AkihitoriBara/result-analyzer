"use client";

import { FileText, Trash2, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";

type SelectedFileCardProps = {
  file: File;
  disabled: boolean;
  actionLabel: string;
  onRemove: () => void;
  onUpload: () => void;
};

export default function SelectedFileCard({
  file,
  disabled,
  actionLabel,
  onRemove,
  onUpload,
}: SelectedFileCardProps) {
  function formatFileSize(bytes: number) {
    if (bytes < 1024) return `${bytes} B`;

    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-6 transition-all duration-200">
      <div className="flex items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="rounded-xl bg-cyan-500/10 p-3">
            <FileText className="h-8 w-8 text-cyan-400" />
          </div>

          <div>
            <h3 className="font-semibold">{file.name}</h3>

            <p className="text-sm text-muted-foreground">
              PDF Document - {formatFileSize(file.size)}
            </p>

            <p className="mt-1 text-sm text-green-400">Ready to upload</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={onUpload}
            disabled={disabled}
            className="bg-cyan-500 text-white hover:bg-cyan-400"
          >
            <Upload className="h-4 w-4" />
            {actionLabel}
          </Button>

          <button
            onClick={onRemove}
            disabled={disabled}
            className="rounded-xl border border-border p-3 transition hover:bg-red-500/10 hover:text-red-400 disabled:pointer-events-none disabled:opacity-50"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
