"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  DashboardStatistics,
  getDashboardStatistics,
} from "@/services/dashboard.service";

type SectionStatus = "loading" | "success" | "empty" | "error";

const CARD_CLASS =
  "rounded-xl border border-border bg-muted/5 p-4 flex flex-col justify-between hover:bg-muted/10 transition-colors";

const SPINNER_CLASS =
  "h-6 w-6 animate-spin rounded-full border-2 border-cyan-500 border-t-transparent";

export default function PerformanceOverview() {
  const [statistics, setStatistics] =
    useState<DashboardStatistics | null>(null);

  const [status, setStatus] =
    useState<SectionStatus>("loading");

  const loadStatistics = async () => {
    setStatus("loading");

    try {
      const data = await getDashboardStatistics();

      setStatistics(data);

      const hasSubjects =
        data.subjectStats &&
        data.subjectStats.length > 0;

      if (data.totalStudents === 0 || !hasSubjects) {
        setStatus("empty");
      } else {
        setStatus("success");
      }
    } catch (error) {
      console.error("Failed to load dashboard preview:", error);
      setStatus("error");
    }
  };

  useEffect(() => {
    loadStatistics();
  }, []);

  const highlightCards =
    status === "success" && statistics
      ? [
          {
            title: "Highest Average",
            subject:
              statistics.highestAverageSubject?.subjectName ?? "N/A",
            value: statistics.highestAverageSubject
              ? `${statistics.highestAverageSubject.averageTotal.toFixed(
                  1
                )} / 100`
              : "—",
            color: "text-cyan-400",
          },
          {
            title: "Lowest Average",
            subject:
              statistics.lowestAverageSubject?.subjectName ?? "N/A",
            value: statistics.lowestAverageSubject
              ? `${statistics.lowestAverageSubject.averageTotal.toFixed(
                  1
                )} / 100`
              : "—",
            color: "text-amber-400",
          },
          {
            title: "Easiest Course",
            subject:
              statistics.easiestSubject?.subjectName ?? "N/A",
            value: statistics.easiestSubject
              ? `Pass Rate: ${statistics.easiestSubject.passPercentage}%`
              : "—",
            color: "text-emerald-400",
          },
          {
            title: "Hardest Course",
            subject:
              statistics.hardestSubject?.subjectName ?? "N/A",
            value: statistics.hardestSubject
              ? `Pass Rate: ${statistics.hardestSubject.passPercentage}%`
              : "—",
            color: "text-red-400",
          },
        ]
      : [];

  return (
    <section className="rounded-2xl border border-border bg-card p-6 flex flex-col justify-between gap-5">
      <div>
        <h2 className="text-lg font-semibold text-foreground">
          Academic Highlights
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Key performance indicators and anomalies for the semester.
        </p>
      </div>

      {status === "loading" && (
        <div className="flex flex-1 items-center justify-center py-8">
          <div className={SPINNER_CLASS} />
        </div>
      )}

      {status === "error" && (
        <div className="flex flex-1 items-center justify-center py-8 text-center text-sm text-red-400">
          Failed to load academic highlights.
        </div>
      )}

      {status === "empty" && (
        <div className="flex flex-1 flex-col items-center justify-center py-8 text-center">
          <p className="text-xs text-muted-foreground">
            No academic results imported yet.
          </p>

          <Link
            href="/uploads"
            className="mt-3 inline-flex rounded-lg border border-cyan-500/20 bg-cyan-500/5 px-3 py-1.5 text-xs font-semibold text-cyan-400 transition-colors hover:bg-cyan-500/10"
          >
            Upload PDF
          </Link>
        </div>
      )}

      {status === "success" && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {highlightCards.map((card) => (
            <div
              key={card.title}
              className={CARD_CLASS}
            >
              <div>
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider ${card.color}`}
                >
                  {card.title}
                </span>

                <h3 className="mt-1 truncate text-sm font-semibold text-foreground">
                  {card.subject}
                </h3>
              </div>

              <p
                className={`mt-3 text-lg font-mono font-bold ${card.color}`}
              >
                {card.value}
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="border-t border-border/10 pt-4">
        <Link
          href="/statistics"
          className="inline-flex items-center text-sm font-semibold text-cyan-400 transition-colors hover:text-cyan-300"
        >
          View Full Analytics →
        </Link>
      </div>
    </section>
  );
}