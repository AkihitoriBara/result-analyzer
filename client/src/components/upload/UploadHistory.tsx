import { Upload } from "@/types/upload";

import UploadHistoryItem from "./UploadHistoryItem";

type UploadHistoryProps = {
  uploads: Upload[];
  loading: boolean;
  deletingUploadId: number | null;
  deleteDisabled: boolean;
  onDeleteUpload: (upload: Upload) => void;
};

export default function UploadHistory({
  uploads,
  loading,
  deletingUploadId,
  deleteDisabled,
  onDeleteUpload,
}: UploadHistoryProps) {
  return (
    <section className="rounded-2xl border border-border bg-card p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold">Upload History</h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Recently imported university result PDFs.
        </p>
      </div>

      {loading && (
        <div className="rounded-xl border border-border p-6 text-sm text-muted-foreground">
          Loading upload history...
        </div>
      )}

      {!loading && uploads.length === 0 && (
        <div className="rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
          No result PDFs have been uploaded yet.
        </div>
      )}

      {!loading && uploads.length > 0 && (
        <div className="space-y-3">
          {uploads.map((upload) => (
            <UploadHistoryItem
              key={upload.id}
              upload={upload}
              deleting={deletingUploadId === upload.id}
              deleteDisabled={deleteDisabled}
              onDelete={onDeleteUpload}
            />
          ))}
        </div>
      )}
    </section>
  );
}
