import { FileText, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Upload } from "@/types/upload";

type UploadHistoryItemProps = {
  upload: Upload;
  deleting: boolean;
  deleteDisabled: boolean;
  onDelete: (upload: Upload) => void;
};

export default function UploadHistoryItem({
  upload,
  deleting,
  deleteDisabled,
  onDelete,
}: UploadHistoryItemProps) {
  const uploadedAt = new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(upload.uploadedAt));

  return (
    <div className="flex items-center justify-between rounded-xl border border-border p-4 transition-all duration-200 hover:bg-accent/30">
      <div className="flex items-center gap-4">
        <div className="rounded-lg border border-border bg-background p-2">
          <FileText className="h-5 w-5 text-cyan-400" />
        </div>

        <div>
          <h3 className="text-sm font-semibold">{upload.originalFileName}</h3>

          <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
            <span>Semester {upload.semester}</span>

            <span>-</span>

            <span>{upload.academicYear}</span>

            <span>-</span>

            <span>{uploadedAt}</span>
          </div>
        </div>
      </div>

      <Button
        variant="destructive"
        size="sm"
        disabled={deleting || deleteDisabled}
        onClick={() => onDelete(upload)}
      >
        <Trash2 className="h-4 w-4" />
        {deleting ? "Deleting" : "Delete"}
      </Button>
    </div>
  );
}
