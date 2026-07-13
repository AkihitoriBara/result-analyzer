type StudentRankProps = {
  rank: number;
  enrollment: string;
  rollNumber: string;
  semester: number;
  sgpa: number;
};

export default function StudentRank({
  rank,
  enrollment,
  rollNumber,
  semester,
  sgpa,
}: StudentRankProps) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-border p-4 transition-colors hover:bg-accent/30">
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-sm font-semibold">
          #{rank}
        </div>

        <div>
          <h3 className="text-sm font-semibold">{enrollment}</h3>

          <p className="mt-1 text-xs text-muted-foreground">
            Roll {rollNumber} • Semester {semester}
          </p>
        </div>
      </div>

      <div className="text-right">
        <p className="text-lg font-bold">{sgpa.toFixed(2)}</p>

        <p className="text-xs text-muted-foreground">SGPA</p>
      </div>
    </div>
  );
}
