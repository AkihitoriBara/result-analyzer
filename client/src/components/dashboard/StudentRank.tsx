type StudentRankProps = {
  rank: number;
  name: string;
  spi: number;
};

export default function StudentRank({ rank, name, spi }: StudentRankProps) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-border p-4 transition-colors hover:bg-accent/30">
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-sm font-semibold">
          #{rank}
        </div>

        <div>
          <h3 className="text-sm font-semibold">{name}</h3>

          <p className="mt-1 text-xs text-muted-foreground">
            Semester Performance
          </p>
        </div>
      </div>

      <div className="text-right">
        <p className="text-lg font-bold">{spi.toFixed(2)}</p>

        <p className="text-xs text-muted-foreground">SPI</p>
      </div>
    </div>
  );
}
