"use client";

import { useEffect, useState } from "react";

import AppShell from "@/components/layout/AppShell";
import UploadDropzone from "@/components/upload/UploadDropzone";
import SelectedFileCard from "@/components/upload/SelectedFileCard";
import UploadDeleteDialog from "@/components/upload/UploadDeleteDialog";
import UploadHistory from "@/components/upload/UploadHistory";
import UploadProgress, {
  UploadPhase,
} from "@/components/upload/UploadProgress";
import {
  deleteUpload,
  getUploads,
  uploadResultPdf,
} from "@/services/upload.service";
import { Upload } from "@/types/upload";

type SuccessState = {
  title: string;
  description?: string;
};

export default function UploadPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploads, setUploads] = useState<Upload[]>([]);
  const [uploadToDelete, setUploadToDelete] = useState<Upload | null>(null);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [uploadPhase, setUploadPhase] = useState<UploadPhase | null>(null);
  const [deletingUploadId, setDeletingUploadId] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState<SuccessState | null>(null);

  const uploadBusy = uploadPhase !== null;

  useEffect(() => {
    loadUploads();
  }, []);

  async function loadUploads() {
    try {
      setHistoryLoading(true);

      const data = await getUploads();

      setUploads(data);
    } catch (error) {
      console.error(error);
      setError("Failed to load upload history.");
    } finally {
      setHistoryLoading(false);
    }
  }

  function handleFileSelected(file: File) {
    if (uploadBusy) {
      return;
    }

    setError("");
    setSuccess(null);

    setSelectedFile(file);
  }

  function removeFile() {
    if (uploadBusy) {
      return;
    }

    setSelectedFile(null);
    setError("");
    setSuccess(null);
    setProgress(0);
  }

  async function handleUpload() {
    if (!selectedFile) {
      setError("Please select a PDF file first.");
      return;
    }

    const fileName = selectedFile.name;

    try {
      setUploadPhase("uploading");
      setError("");
      setSuccess(null);
      setProgress(0);

      const result = await uploadResultPdf(selectedFile, {
        onProgress: setProgress,
        onProcessing: () => setUploadPhase("processing"),
      });

      setSelectedFile(null);
      setProgress(0);
      setSuccess({
        title: `Successfully imported ${fileName}`,
        description: `${result.totalStudents} students imported successfully.`,
      });

      await loadUploads();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "The PDF could not be processed.";

      setError(message || "The PDF could not be processed.");
    } finally {
      setUploadPhase(null);
    }
  }

  function openDeleteDialog(upload: Upload) {
    if (uploadBusy) {
      return;
    }

    setError("");
    setSuccess(null);
    setUploadToDelete(upload);
  }

  function closeDeleteDialog() {
    if (deletingUploadId !== null) {
      return;
    }

    setUploadToDelete(null);
  }

  async function confirmDeleteUpload() {
    if (!uploadToDelete || uploadBusy) {
      return;
    }

    try {
      setDeletingUploadId(uploadToDelete.id);
      setError("");
      setSuccess(null);

      const result = await deleteUpload(uploadToDelete.id);

      setUploads((currentUploads) =>
        currentUploads.filter((upload) => upload.id !== uploadToDelete.id),
      );
      setUploadToDelete(null);
      setSuccess({
        title: result.message,
      });

      await loadUploads();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to delete upload.";

      setError(message);
    } finally {
      setDeletingUploadId(null);
    }
  }

  return (
    <AppShell
      title="Uploads"
      description="Import university result PDFs into the system"
    >
      <div className="space-y-8">
        <UploadDropzone
          selectedFile={selectedFile}
          disabled={uploadBusy}
          onFileSelect={handleFileSelected}
          onError={setError}
        />

        {uploadPhase && <UploadProgress progress={progress} phase={uploadPhase} />}

        {error && (
          <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400 transition-all duration-200">
            {error}
          </div>
        )}

        {success && (
          <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400 transition-all duration-200">
            <p className="font-medium">{success.title}</p>

            {success.description && (
              <p className="mt-1 text-emerald-300">{success.description}</p>
            )}
          </div>
        )}

        {selectedFile && (
          <SelectedFileCard
            file={selectedFile}
            disabled={uploadBusy}
            actionLabel={
              uploadPhase === "processing"
                ? "Processing"
                : uploadPhase === "uploading"
                  ? "Uploading"
                  : "Upload PDF"
            }
            onRemove={removeFile}
            onUpload={handleUpload}
          />
        )}

        <UploadHistory
          uploads={uploads}
          loading={historyLoading}
          deletingUploadId={deletingUploadId}
          deleteDisabled={uploadBusy}
          onDeleteUpload={openDeleteDialog}
        />
      </div>

      {uploadToDelete && (
        <UploadDeleteDialog
          upload={uploadToDelete}
          deleting={deletingUploadId === uploadToDelete.id}
          onCancel={closeDeleteDialog}
          onConfirm={confirmDeleteUpload}
        />
      )}
    </AppShell>
  );
}
