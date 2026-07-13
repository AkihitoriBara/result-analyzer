"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import {
  DashboardStatistics,
  getDashboardStatistics,
} from "@/services/dashboard.service";

import StatisticCard from "./StatisticCard";

type SectionStatus = "loading" | "success" | "empty" | "error";

type StatCardConfig = {
  title: string;
  description: string;
  getValue: (statistics: DashboardStatistics) => string | number;
};

const statCards: StatCardConfig[] = [
  {
    title: "Total Students",
    description: "Students in the current database",
    getValue: (statistics) => statistics.totalStudents.toLocaleString(),
  },
  {
    title: "Passed Students",
    description: "Students who passed their results",
    getValue: (statistics) => statistics.passedStudents.toLocaleString(),
  },
  {
    title: "Failed Students",
    description: "Students who did not pass",
    getValue: (statistics) => statistics.failedStudents.toLocaleString(),
  },
  {
    title: "Average SGPA",
    description: "Across all uploaded results",
    getValue: (statistics) => statistics.averageSGPA.toFixed(2),
  },
  {
    title: "Highest SGPA",
    description: "Best performance recorded",
    getValue: (statistics) => statistics.highestSGPA.toFixed(2),
  },
  {
    title: "Lowest SGPA",
    description: "Lowest performance recorded",
    getValue: (statistics) => statistics.lowestSGPA.toFixed(2),
  },
  {
    title: "Pass Percentage",
    description: "Overall passing percentage",
    getValue: (statistics) => `${statistics.passPercentage}%`,
  },
];

export default function DashboardStats() {
  const [statistics, setStatistics] = useState<DashboardStatistics | null>(
    null,
  );
  const [status, setStatus] = useState<SectionStatus>("loading");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadStatistics() {
      setStatus("loading");

      try {
        const data = await getDashboardStatistics();

        setStatistics(data);
        setStatus(data.totalStudents === 0 ? "empty" : "success");
      } catch (error) {
        console.error(error);
        setStatistics(null);
        setErrorMessage("Failed to load statistics.");
        setStatus("error");
      }
    }

    loadStatistics();
  }, []);

  return (
    <section className="space-y-6">
      {status === "empty" && (
        <div className="rounded-2xl border border-dashed border-border bg-card p-8 text-center">
          <p className="text-sm text-muted-foreground">
            No student results have been imported yet.
          </p>

          <Link
            href="/uploads"
            className="mt-4 inline-flex rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-400 transition-colors hover:bg-cyan-500/20"
          >
            Go to Uploads
          </Link>
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {statCards.map((card) => (
          <StatisticCard
            key={card.title}
            title={card.title}
            description={card.description}
            status={status}
            value={statistics ? card.getValue(statistics) : undefined}
            errorMessage={errorMessage}
          />
        ))}
      </div>
    </section>
  );
}
