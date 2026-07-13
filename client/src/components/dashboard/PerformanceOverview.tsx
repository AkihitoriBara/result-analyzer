"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  DashboardStatistics,
  getDashboardStatistics,
} from "@/services/dashboard.service";
import RadarChart from "../statistics/RadarChart";

type SectionStatus = "loading" | "success" | "empty" | "error";

export default function PerformanceOverview() {
  const [statistics, setStatistics] = useState<DashboardStatistics | null>(null);
  const [status, setStatus] = useState<SectionStatus>("loading");

  useEffect(() => {
    async function loadStatistics() {
      setStatus("loading");
      try {
        const data = await getDashboardStatistics();
        setStatistics(data);

        const hasSubjects = data.subjectStats && data.subjectStats.length > 0;
        if (data.totalStudents === 0 || !hasSubjects) {
          setStatus("empty");
        } else {
          setStatus("success");
        }
      } catch (error) {
        console.error("Failed to load dashboard preview:", error);
        setStatus("error");
      }
    }

    loadStatistics();
  }, []);

  return (
    <section className="rounded-2xl border border-border bg-card p-6 flex flex-col justify-between gap-5">
      <div>
        <h2 className="text-lg font-semibold text-foreground">Academic Highlights</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Key performance indicators and anomalies for the semester.
        </p>
      </div>

      {status === "loading" && (
        <div className="flex flex-1 items-center justify-center py-8">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-cyan-500 border-t-transparent" />
        </div>
      )}

      {status === "error" && (
        <div className="flex flex-1 items-center justify-center text-sm text-red-400 py-8 text-center">
          Failed to load academic highlights.
        </div>
      )}

      {status === "empty" && (
        <div className="flex flex-1 flex-col items-center justify-center py-8 text-center">
          <p className="text-xs text-muted-foreground">No academic results imported yet.</p>
          <Link
            href="/uploads"
            className="mt-3 inline-flex rounded-lg border border-cyan-500/20 bg-cyan-500/5 px-3 py-1.5 text-xs font-semibold text-cyan-400 hover:bg-cyan-500/10 transition-colors"
          >
            Upload PDF
          </Link>
        </div>
      )}

      {status === "success" && statistics && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Highest Average */}
          <div className="rounded-xl border border-border bg-muted/5 p-4 flex flex-col justify-between hover:bg-muted/10 transition-colors">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">
                Highest Average
              </span>
              <h3 className="mt-1 text-sm font-semibold text-foreground truncate">
                {statistics.highestAverageSubject?.subjectName ?? "N/A"}
              </h3>
            </div>
            <p className="mt-3 text-lg font-mono font-bold text-foreground">
              {statistics.highestAverageSubject
                ? `${statistics.highestAverageSubject.averageTotal.toFixed(1)} / 100`
                : "—"}
            </p>
          </div>

          {/* Lowest Average */}
          <div className="rounded-xl border border-border bg-muted/5 p-4 flex flex-col justify-between hover:bg-muted/10 transition-colors">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                Lowest Average
              </span>
              <h3 className="mt-1 text-sm font-semibold text-foreground truncate">
                {statistics.lowestAverageSubject?.subjectName ?? "N/A"}
              </h3>
            </div>
            <p className="mt-3 text-lg font-mono font-bold text-foreground">
              {statistics.lowestAverageSubject
                ? `${statistics.lowestAverageSubject.averageTotal.toFixed(1)} / 100`
                : "—"}
            </p>
          </div>

          {/* Easiest Course */}
          <div className="rounded-xl border border-border bg-muted/5 p-4 flex flex-col justify-between hover:bg-muted/10 transition-colors">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                Easiest Course
              </span>
              <h3 className="mt-1 text-sm font-semibold text-foreground truncate">
                {statistics.easiestSubject?.subjectName ?? "N/A"}
              </h3>
            </div>
            <p className="mt-3 text-lg font-mono font-bold text-emerald-400">
              {statistics.easiestSubject
                ? `Pass Rate: ${statistics.easiestSubject.passPercentage}%`
                : "—"}
            </p>
          </div>

          {/* Hardest Course */}
          <div className="rounded-xl border border-border bg-muted/5 p-4 flex flex-col justify-between hover:bg-muted/10 transition-colors">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-red-400">
                Hardest Course
              </span>
              <h3 className="mt-1 text-sm font-semibold text-foreground truncate">
                {statistics.hardestSubject?.subjectName ?? "N/A"}
              </h3>
            </div>
            <p className="mt-3 text-lg font-mono font-bold text-red-400">
              {statistics.hardestSubject
                ? `Pass Rate: ${statistics.hardestSubject.passPercentage}%`
                : "—"}
            </p>
          </div>
        </div>
      )}

      <div className="border-t border-border/10 pt-4">
        <Link
          href="/statistics"
          className="inline-flex items-center text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          View Full Analytics →
        </Link>
      </div>
    </section>
  );
}
