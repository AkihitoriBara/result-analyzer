type PageHeaderProps = {
  title: string;
  description: string;
  actions?: React.ReactNode;
};

export default function PageHeader({
  title,
  description,
  actions,
}: PageHeaderProps) {
  return (
    <header className="flex h-20 items-center justify-between border-b border-border bg-background px-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>

        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>

      <div className="flex items-center gap-3">
        {actions}

        <div className="rounded-xl border border-border bg-card px-4 py-2 text-sm font-medium">
          Semester 4
        </div>
      </div>
    </header>
  );
}
