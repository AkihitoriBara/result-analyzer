"use client";

import { useRef, useState } from "react";

import { FileUp, Upload } from "lucide-react";

type UploadDropzoneProps = {
  selectedFile: File | null;
  disabled: boolean;
  onFileSelect: (file: File) => void;
  onError: (message: string) => void;
};

export default function UploadDropzone({
  selectedFile,
  disabled,
  onFileSelect,
  onError,
}: UploadDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [dragActive, setDragActive] = useState(false);

  function validateFile(file: File) {
    if (disabled) {
      return;
    }

    if (file.type !== "application/pdf") {
      onError("Only PDF result files are currently supported.");

      return;
    }

    onError("");

    onFileSelect(file);
  }

  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();

    setDragActive(false);

    if (disabled) {
      return;
    }

    const file = event.dataTransfer.files[0];

    if (!file) return;

    validateFile(file);
  }

  function handleBrowse(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    validateFile(file);
  }

  return (
    <>
      <div
        onClick={() => {
          if (!disabled) {
            inputRef.current?.click();
          }
        }}
        onDragOver={(event) => event.preventDefault()}
        onDragEnter={() => {
          if (!disabled) {
            setDragActive(true);
          }
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        className={`rounded-2xl border-2 border-dashed p-16 transition-all duration-300 ${
          disabled
            ? "cursor-not-allowed border-border bg-card opacity-60"
            : dragActive
              ? "cursor-pointer border-cyan-500 bg-cyan-500/5"
              : "cursor-pointer border-border bg-card hover:border-cyan-500/40"
        }`}
      >
        <div className="flex flex-col items-center text-center">
          <div
            className={`mb-6 rounded-full p-5 transition-all ${
              dragActive && !disabled ? "bg-cyan-500/10" : "bg-muted"
            }`}
          >
            {dragActive && !disabled ? (
              <Upload className="h-10 w-10 text-cyan-400" />
            ) : (
              <FileUp className="h-10 w-10 text-muted-foreground" />
            )}
          </div>

          <h2 className="text-2xl font-semibold">
            {disabled
              ? "Processing Result File"
              : dragActive
                ? "Drop Result File"
                : "Upload Result File"}
          </h2>

          <p className="mt-3 text-muted-foreground">
            {disabled
              ? "Please wait until the current import is complete."
              : "Drag & Drop your university result PDF"}
          </p>

          {!disabled && (
            <p className="text-muted-foreground">
              or click anywhere inside this area to browse.
            </p>
          )}

          <p className="mt-6 text-sm text-muted-foreground">
            Currently supports PDF files
          </p>

          {selectedFile && (
            <p className="mt-4 text-sm font-medium text-cyan-400">
              Selected: {selectedFile.name}
            </p>
          )}
        </div>
      </div>

      <input
        hidden
        ref={inputRef}
        type="file"
        accept=".pdf"
        disabled={disabled}
        onChange={handleBrowse}
      />
    </>
  );
}
