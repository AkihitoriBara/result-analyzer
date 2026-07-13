import { FileText } from "lucide-react";

type UploadItemProps = {
  fileName: string;
  semester: number;
  uploadedAt: string;
  studentCount: number;
};

export default function UploadItem({
  fileName,
  semester,
  uploadedAt,
  studentCount,
}: UploadItemProps) {
  const formattedDate = new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(uploadedAt));

  return (
    <div className="flex items-center justify-between rounded-xl border border-border p-4 transition-colors hover:bg-accent/30">
      <div className="flex items-center gap-4">
        <div className="rounded-lg border border-border bg-background p-2">
          <FileText className="h-5 w-5 text-cyan-400" />
        </div>

        <div>
          <h3 className="text-sm font-semibold">{fileName}</h3>

          <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
            <span>Semester {semester}</span>

            <span>•</span>

            <span>
              {studentCount} student{studentCount === 1 ? "" : "s"} imported
            </span>
          </div>
        </div>
      </div>

      <span className="text-xs text-muted-foreground">{formattedDate}</span>
    </div>
  );
}
