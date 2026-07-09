type StatisticCardProps = {
  title: string;
  value: string | number;
  description: string;
};

export default function StatisticCard({
  title,
  value,
  description,
}: StatisticCardProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md">
      <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>

      <p className="mt-3 text-3xl font-bold">{value}</p>

      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
