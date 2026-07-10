export default function ActionButtons() {
  return (
    <div className="flex gap-3">
      <button
        disabled
        className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground opacity-70"
      >
        Generate PDF
      </button>

      <button
        disabled
        className="rounded-lg border border-border px-4 py-2 text-sm opacity-70"
      >
        Export Excel
      </button>
    </div>
  );
}
