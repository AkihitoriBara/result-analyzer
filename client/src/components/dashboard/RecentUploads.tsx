"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import {
  getRecentUploads,
  RecentUpload,
} from "@/services/dashboard.service";

import UploadItem from "./UploadItem";

type SectionStatus = "loading" | "success" | "empty" | "error";

export default function RecentUploads() {
  const [uploads, setUploads] = useState<RecentUpload[]>([]);
  const [status, setStatus] = useState<SectionStatus>("loading");

  const loadRecentUploads = async () => {
  setStatus("loading");

  try {
    const data = await getRecentUploads();

    setUploads(data);
    setStatus(data.length === 0 ? "empty" : "success");
  } catch (error) {
    console.error(error);

    setUploads([]);
    setStatus("error");
  }
};

useEffect(() => {
  loadRecentUploads();
}, []);

  return (
    <section className="rounded-2xl border border-border bg-card p-6 h-[480px] flex flex-col justify-between">
      
      <div className="mb-6 flex-shrink-0">
        <h2 className="text-lg font-semibold">Recent Uploads</h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Recently processed university result PDFs.
        </p>
      </div>

      {status === "loading" && (
        <div className="flex-1 rounded-xl border border-border p-6 text-sm text-muted-foreground">
          Loading recent uploads...
        </div>
      )}

      {status === "error" && (
        <div className="flex-1 rounded-xl border border-red-500/20 bg-red-500/10 p-6 text-sm text-red-400">
          Failed to load recent uploads.
        </div>
      )}

      {status === "empty" && (
        <div className="flex-1 rounded-xl border border-dashed border-border p-8 text-center flex flex-col items-center justify-center">
          <p className="text-sm text-muted-foreground">
            No result PDFs have been uploaded yet.
          </p>

          <Link
            href="/uploads"
            className="mt-4 inline-flex rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-400 transition-colors hover:bg-cyan-500/20"
          >
            Go to Uploads
          </Link>
        </div>
      )}

      {status === "success" && (
        <div className="flex-1 overflow-y-auto space-y-3 pr-1.5 custom-scrollbar">
          {uploads.map((upload) => (
            <UploadItem
              key={upload.id}
              fileName={upload.fileName}
              semester={upload.semester}
              uploadedAt={upload.uploadedAt}
              studentCount={upload.studentCount}
            />
          ))}
        </div>
      )}

      {status === "success" && (
        <div className="mt-6 border-t border-border pt-4 flex-shrink-0">
          <Link
            href="/uploads"
            className="text-sm font-medium text-cyan-400 transition-colors hover:text-cyan-300"
          >
            View all uploads →
          </Link>
        </div>
      )}
    </section>
  );
}
