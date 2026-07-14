"use client";

import { DashboardStatistics } from "@/services/dashboard.service";

type AnalyticsOverviewProps = {
  statistics: DashboardStatistics;
};

export default function AnalyticsOverview({ statistics }: AnalyticsOverviewProps) {
  const cards = [
    {
      title: "Hardest Subject",
      value: statistics.hardestSubject?.subjectCode ?? "N/A",
      subValue: statistics.hardestSubject
        ? `Pass Rate: ${statistics.hardestSubject.passPercentage}%`
        : "No data available",
      description: statistics.hardestSubject?.subjectName ?? "Subject with lowest pass rate",
      valueClass: "text-red-400",
      borderClass: "border-l-red-500/40",
      badgeClass: "bg-red-500/10 text-red-400 border-red-500/20",
    },
    {
      title: "Easiest Subject",
      value: statistics.easiestSubject?.subjectCode ?? "N/A",
      subValue: statistics.easiestSubject
        ? `Pass Rate: ${statistics.easiestSubject.passPercentage}%`
        : "No data available",
      description: statistics.easiestSubject?.subjectName ?? "Subject with highest pass rate",
      valueClass: "text-emerald-400",
      borderClass: "border-l-emerald-500/40",
      badgeClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    },
    {
      title: "Highest Subject Average",
      value: statistics.highestAverageSubject
        ? statistics.highestAverageSubject.averageTotal.toFixed(1)
        : "N/A",
      subValue: statistics.highestAverageSubject?.subjectCode ?? "No data",
      description: statistics.highestAverageSubject?.subjectName ?? "Subject with highest total score",
      valueClass: "text-cyan-400",
      borderClass: "border-l-cyan-500/40",
      badgeClass: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    },
    {
      title: "Lowest Subject Average",
      value: statistics.lowestAverageSubject
        ? statistics.lowestAverageSubject.averageTotal.toFixed(1)
        : "N/A",
      subValue: statistics.lowestAverageSubject?.subjectCode ?? "No data",
      description: statistics.lowestAverageSubject?.subjectName ?? "Subject with lowest total score",
      valueClass: "text-amber-400",
      borderClass: "border-l-amber-500/40",
      badgeClass: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    },
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className={`
            rounded-xl border border-border bg-card p-6 flex flex-col justify-between
            transition-all duration-200 hover:shadow-md border-l-4 ${card.borderClass}
          `}
        >
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {card.title}
            </span>

            <p className={`mt-2 text-3xl font-extrabold tracking-tight ${card.valueClass}`}>
              {card.value}
            </p>

            <div className="mt-2.5">
              <span className={`inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-mono font-medium ${card.badgeClass}`}>
                {card.subValue}
              </span>
            </div>
          </div>

          <p className="mt-5 text-xs text-muted-foreground border-t border-border/10 pt-3.5">
            {card.description}
          </p>
        </div>
      ))}
    </div>
  );
}
