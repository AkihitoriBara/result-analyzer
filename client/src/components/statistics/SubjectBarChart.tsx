"use client";

import { SubjectStats } from "@/services/dashboard.service";

type SubjectBarChartProps = {
  subjects: SubjectStats[];
  selectedSubject: string | null;
  onSelectSubject: (code: string) => void;
};

export default function SubjectBarChart({
  subjects,
  selectedSubject,
  onSelectSubject,
}: SubjectBarChartProps) {
  if (subjects.length === 0) return null;

  // Find max total to set the bar percentage scale (usually 100 marks is max)
  const maxVal = 100;

  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Average Marks Comparison</h2>

          <p className="text-sm text-muted-foreground">
            Distribution of internal (out of 60) vs external (out of 40) exams.
          </p>
        </div>

        {/* Legend */}
        <div className="flex gap-4 text-xs font-medium">
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded bg-cyan-700" />
            <span className="text-muted-foreground">Internal (60)</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded bg-cyan-400" />
            <span className="text-muted-foreground">External (40)</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {subjects.map((sub) => {
          const internalWidth = (sub.averageInternal / maxVal) * 100;
          const externalWidth = (sub.averageExternal / maxVal) * 100;
          const isSelected = selectedSubject === sub.subjectCode;

          return (
            <div
              key={sub.subjectCode}
              onClick={() => onSelectSubject(sub.subjectCode)}
              className={`
                group cursor-pointer rounded-xl border py-4 px-5 transition-all duration-200
                ${
                  isSelected
                    ? "bg-cyan-500/5 border-cyan-500/20 shadow-sm"
                    : "bg-muted/5 border-transparent hover:bg-accent/25 hover:border-border"
                }
              `}
            >
              {/* Info Header */}
              <div className="mb-2.5 flex items-center justify-between text-sm">
                <span className="font-semibold text-foreground group-hover:text-cyan-400 transition-colors">
                  {sub.subjectName} ({sub.subjectCode})
                </span>

                <span className="font-mono font-bold text-foreground">
                  {sub.averageTotal.toFixed(1)} / 100
                </span>
              </div>

              {/* Progress Bar Container */}
              <div className="relative h-2 w-full overflow-hidden rounded-full bg-muted/30">
                {/* Internal bar */}
                <div
                  style={{ width: `${internalWidth}%` }}
                  className="absolute left-0 top-0 h-full bg-cyan-700 transition-all duration-500"
                />

                {/* External bar (starts right after internal) */}
                <div
                  style={{
                    width: `${externalWidth}%`,
                    left: `${internalWidth}%`,
                  }}
                  className="absolute top-0 h-full bg-cyan-400 transition-all duration-500"
                />
              </div>

              {/* Detail stats displayed on hover or selection */}
              <div className="mt-2.5 flex gap-5 text-xs font-mono text-muted-foreground/80">
                <span>Int: {sub.averageInternal.toFixed(1)}/60</span>

                <span>Ext: {sub.averageExternal.toFixed(1)}/40</span>

                <span className={isSelected ? "text-cyan-400 font-semibold" : ""}>
                  Pass Rate: {sub.passPercentage}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
