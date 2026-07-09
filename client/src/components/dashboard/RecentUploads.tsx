import Link from "next/link";

import UploadItem from "./UploadItem";

const uploads = [
  {
    fileName: "Semester 4 Results.pdf",
    status: "Processed" as const,
    uploadedAt: "2 min ago",
    fileSize: "4.8 MB",
  },
  {
    fileName: "Semester 3 Results.pdf",
    status: "Processed" as const,
    uploadedAt: "Yesterday",
    fileSize: "5.1 MB",
  },
  {
    fileName: "Semester 2 Results.pdf",
    status: "Processed" as const,
    uploadedAt: "3 days ago",
    fileSize: "4.6 MB",
  },
];

export default function RecentUploads() {
  return (
    <section className="rounded-2xl border border-border bg-card p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold">Recent Uploads</h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Recently processed university result PDFs.
        </p>
      </div>

      <div className="space-y-3">
        {uploads.map((upload) => (
          <UploadItem
            key={upload.fileName}
            fileName={upload.fileName}
            status={upload.status}
            uploadedAt={upload.uploadedAt}
            fileSize={upload.fileSize}
          />
        ))}
      </div>

      <div className="mt-6 border-t border-border pt-4">
        <Link
          href="/uploads"
          className="text-sm font-medium text-cyan-400 transition-colors hover:text-cyan-300"
        >
          View all uploads →
        </Link>
      </div>
    </section>
  );
}
