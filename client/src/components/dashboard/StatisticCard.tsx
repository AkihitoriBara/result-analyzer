type StatisticCardStatus = "loading" | "success" | "empty" | "error";

type StatisticCardProps = {
  title: string;
  description: string;
  status: StatisticCardStatus;
  value?: string | number;
  errorMessage?: string;
};

export default function StatisticCard({
  title,
  description,
  status,
  value,
  errorMessage = "Failed to load",
}: StatisticCardProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md">
      <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>

      {status === "loading" && (
        <p className="mt-3 text-3xl font-bold text-muted-foreground">...</p>
      )}

      {status === "success" && (
        <p className="mt-3 text-3xl font-bold">{value}</p>
      )}

      {status === "empty" && (
        <p className="mt-3 text-3xl font-bold text-muted-foreground">—</p>
      )}

      {status === "error" && (
        <p className="mt-3 text-sm font-medium text-red-400">{errorMessage}</p>
      )}

      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
