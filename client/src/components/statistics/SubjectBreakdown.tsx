"use client";

import { SubjectStats } from "@/services/dashboard.service";
import StudentStatusBadge from "../students/StudentStatusBadge";

type SubjectBreakdownProps = {
  subject: SubjectStats;
};

export default function SubjectBreakdown({ subject }: SubjectBreakdownProps) {
  // Extract grade distribution and compute percentages
  const grades = ["O", "A+", "A", "B+", "B", "C", "D", "F"];
  const distribution = subject.gradeDistribution || {};

  // Find the highest count in any grade to normalize histogram heights
  const counts = grades.map((g) => distribution[g] ?? 0);
  const maxCount = Math.max(...counts, 1);

  // Generate automated advice for faculty
  const getFacultyInsight = (sub: SubjectStats) => {
    const isHard = sub.passPercentage < 75;
    const lowExternal = sub.averageExternal < 20; // Avg external < 50%
    const gradeFCount = distribution["F"] ?? 0;

    if (isHard) {
      return `Warning: ${sub.subjectName} has a low pass percentage (${sub.passPercentage}%). Faculty should verify if students struggled in the external exam, which averages ${sub.averageExternal}/40. Consider conducting extra revision classes.`;
    }

    if (lowExternal && gradeFCount > 0) {
      return `Notice: While the overall pass rate is stable, the external exam average (${sub.averageExternal}/40) is relatively low. Adjusting lecture plans to emphasize final exam preparation is recommended.`;
    }

    return `Strong Performance: ${sub.subjectName} shows healthy marks distribution. The class average is ${sub.averageTotal}/100 with a high pass rate of ${sub.passPercentage}%. Keep up the current instruction pattern.`;
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <div className="border-b border-border pb-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
          Detailed Subject Analytics
        </span>

        <h2 className="mt-1 text-2xl font-bold text-foreground">
          {subject.subjectName}
        </h2>

        <p className="text-sm text-muted-foreground">Code: {subject.subjectCode}</p>
      </div>

      {/* Basic Metrics Grid */}
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-lg bg-muted/5 p-2.5 border border-border/20 flex flex-col justify-between">
          <span className="text-[11px] font-medium text-muted-foreground">Pass Percentage</span>
          <p className="mt-0.5 text-lg font-bold text-cyan-400">
            {subject.passPercentage}%
          </p>
        </div>

        <div className="rounded-lg bg-muted/5 p-2.5 border border-border/20 flex flex-col justify-between">
          <span className="text-[11px] font-medium text-muted-foreground">Class Average</span>
          <p className="mt-0.5 text-lg font-bold text-foreground">
            {subject.averageTotal.toFixed(1)}
          </p>
        </div>

        <div className="rounded-lg bg-muted/5 p-2.5 border border-border/20 flex flex-col justify-between">
          <span className="text-[11px] font-medium text-muted-foreground">Total Students</span>
          <p className="mt-0.5 text-lg font-bold text-foreground">
            {subject.totalStudents}
          </p>
        </div>

        <div className="rounded-lg bg-muted/5 p-2.5 border border-border/20 flex flex-col justify-between">
          <span className="text-[11px] font-medium text-muted-foreground">Avg Grade Points</span>
          <p className="mt-0.5 text-lg font-bold text-foreground">
            {subject.averageGradePoints.toFixed(1)}
          </p>
        </div>
      </div>

      {/* Grade Distribution Histogram */}
      <div className="mt-6">
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
          Grade Distribution
        </h3>

        <div className="flex h-56 items-end justify-between gap-3 border-b border-border/40 pb-2 pt-4 px-2 bg-muted/5 rounded-lg">
          {grades.map((grade) => {
            const count = distribution[grade] ?? 0;
            const barHeight = (count / maxCount) * 100;
            const isFailure = grade === "F";
            const hasCount = count > 0;

            return (
              <div
                key={grade}
                className="group flex flex-1 flex-col items-center gap-2 h-full justify-end"
              >
                {/* Tooltip on hover */}
                <span className={`text-[10px] font-mono text-cyan-400 font-bold transition-opacity duration-150 ${hasCount ? "opacity-0 group-hover:opacity-100" : "opacity-0"
                  }`}>
                  {count}
                </span>

                {/* Vertical Bar */}
                <div
                  style={{ height: `${Math.max(barHeight, 6)}%` }}
                  className={`
                    w-full rounded-t transition-all duration-300
                    ${isFailure
                      ? hasCount
                        ? "bg-red-500/40 border border-red-500/50 group-hover:bg-red-400"
                        : "bg-muted/10 border-transparent"
                      : hasCount
                        ? "bg-cyan-500/40 border border-cyan-500/50 group-hover:bg-cyan-400"
                        : "bg-muted/10 border-transparent"
                    }
                  `}
                />

                {/* X Axis Label */}
                <span className="text-xs font-semibold text-muted-foreground mt-0.5">
                  {grade}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Subject Topper & Insights */}
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {/* Subject Topper Card */}
        <div className="rounded-xl border border-border bg-card p-5 border-l-4 border-l-cyan-500/60 shadow-sm">
          <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400">
            Subject Topper
          </h3>

          {subject.topper ? (
            <div className="mt-3">
              <p className="text-xl font-bold text-foreground">
                Marks: {subject.topper.total} / 100
              </p>

              <div className="mt-2.5 text-xs text-muted-foreground space-y-1.5 font-mono">
                <p>Enrollment: {subject.topper.enrollment}</p>
                <p>Roll Number: {subject.topper.rollNumber}</p>
              </div>
            </div>
          ) : (
            <p className="mt-3 text-sm text-muted-foreground">
              No topper data recorded.
            </p>
          )}
        </div>

        {/* Faculty Insights Card */}
        <div className="rounded-xl border border-border bg-card p-5 border-l-4 border-l-muted-foreground/35 shadow-sm">
          <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Academic Insights
          </h3>

          <p className="mt-3 text-xs sm:text-sm text-muted-foreground leading-relaxed">
            {getFacultyInsight(subject)}
          </p>
        </div>
      </div>
    </div>
  );
}
