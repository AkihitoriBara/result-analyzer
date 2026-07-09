import { FileText } from "lucide-react";

type UploadItemProps = {
  fileName: string;
  status: "Processed" | "Processing" | "Failed";
  uploadedAt: string;
  fileSize: string;
};

export default function UploadItem({
  fileName,
  status,
  uploadedAt,
  fileSize,
}: UploadItemProps) {
  const statusClasses = {
    Processed: "text-emerald-400",
    Processing: "text-amber-400",
    Failed: "text-red-400",
  };

  return (
    <div className="flex items-center justify-between rounded-xl border border-border p-4 transition-colors hover:bg-accent/30">
      <div className="flex items-center gap-4">
        <div className="rounded-lg border border-border bg-background p-2">
          <FileText className="h-5 w-5 text-cyan-400" />
        </div>

        <div>
          <h3 className="text-sm font-semibold">{fileName}</h3>

          <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
            <span className={statusClasses[status]}>{status}</span>

            <span>•</span>

            <span>{fileSize}</span>
          </div>
        </div>
      </div>

      <span className="text-xs text-muted-foreground">{uploadedAt}</span>
    </div>
  );
}
