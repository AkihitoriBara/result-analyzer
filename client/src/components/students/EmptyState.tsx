export default function EmptyState() {
  return (
    <div className="rounded-2xl border border-border bg-card p-12 text-center">
      <h2 className="text-xl font-semibold">No Students Found</h2>

      <p className="mt-2 text-muted-foreground">
        Upload a result PDF to populate the database.
      </p>
    </div>
  );
}
