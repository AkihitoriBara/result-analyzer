"use client";

import { AlertTriangle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Upload } from "@/types/upload";

type UploadDeleteDialogProps = {
  upload: Upload;
  deleting: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function UploadDeleteDialog({
  upload,
  deleting,
  onCancel,
  onConfirm,
}: UploadDeleteDialogProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 px-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-xl">
        <div className="flex items-start gap-4">
          <div className="rounded-xl bg-red-500/10 p-3 text-red-400">
            <AlertTriangle className="h-5 w-5" />
          </div>

          <div>
            <h2 className="text-lg font-semibold">Delete Upload?</h2>

            <p className="mt-2 text-sm text-muted-foreground">
              You are deleting {upload.originalFileName}.
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-border bg-background p-4 text-sm text-muted-foreground">
          <p>Deleting this upload will permanently remove:</p>

          <ul className="mt-3 space-y-2">
            <li>the uploaded PDF record</li>
            <li>every parsed Result</li>
            <li>every Subject belonging to those results</li>
          </ul>

          <p className="mt-4">
            Student records should only be deleted if they are no longer
            referenced by any upload.
          </p>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <Button variant="outline" disabled={deleting} onClick={onCancel}>
            Cancel
          </Button>

          <Button
            variant="destructive"
            disabled={deleting}
            onClick={onConfirm}
          >
            {deleting ? "Deleting" : "Delete Upload"}
          </Button>
        </div>
      </div>
    </div>
  );
}
