"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AppShell from "@/components/layout/AppShell";
import {
  DashboardStatistics,
  getDashboardStatistics,
  SubjectStats,
} from "@/services/dashboard.service";
import RadarChart from "@/components/statistics/RadarChart";
import SubjectBarChart from "@/components/statistics/SubjectBarChart";
import SubjectBreakdown from "@/components/statistics/SubjectBreakdown";
import AnalyticsOverview from "@/components/statistics/AnalyticsOverview";

type SectionStatus = "loading" | "success" | "empty" | "error";

export default function StatisticsPage() {
  const [statistics, setStatistics] = useState<DashboardStatistics | null>(null);
  const [status, setStatus] = useState<SectionStatus>("loading");
  const [selectedSubjectCode, setSelectedSubjectCode] = useState<string | null>(null);

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
          // Default to the hardest subject to immediately highlight potential areas for academic focus
          const hardestCode = data.hardestSubject?.subjectCode ?? data.subjectStats?.[0]?.subjectCode ?? null;
          setSelectedSubjectCode(hardestCode);
        }
      } catch (error) {
        console.error("Failed to load statistics:", error);
        setStatus("error");
      }
    }

    loadStatistics();
  }, []);

  const selectedSubject = statistics?.subjectStats?.find(
    (sub) => sub.subjectCode === selectedSubjectCode
  ) ?? null;

  return (
    <AppShell
      title="Academic Analytics"
      description="Identify course weaknesses, grade distributions, and general class performance averages."
    >
      {/* Loading state */}
      {status === "loading" && (
        <div className="flex h-96 items-center justify-center rounded-2xl border border-border bg-card">
          <div className="text-center space-y-3">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-cyan-500 border-t-transparent mx-auto" />
            <p className="text-sm text-muted-foreground">Compiling class analytics...</p>
          </div>
        </div>
      )}

      {/* Error state */}
      {status === "error" && (
        <div className="flex h-96 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/5 text-center p-8">
          <div className="max-w-md space-y-4">
            <h2 className="text-lg font-semibold text-red-400">Failed to load analytics</h2>
            <p className="text-sm text-muted-foreground">
              We encountered an issue communicating with the database. Please verify your connection or try again.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-400 hover:bg-cyan-500/20"
            >
              Retry Connection
            </button>
          </div>
        </div>
      )}

      {/* Empty state */}
      {status === "empty" && (
        <div className="flex h-96 flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card text-center p-8">
          <div className="max-w-md space-y-4">
            <h2 className="text-lg font-semibold text-foreground">No Academic Data Available</h2>
            <p className="text-sm text-muted-foreground">
              To view analytics, you must first import semester results in PDF format.
            </p>
            <Link
              href="/uploads"
              className="inline-flex rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-400 hover:bg-cyan-500/20"
            >
              Go to Uploads
            </Link>
          </div>
        </div>
      )}

      {/* Success layout */}
      {status === "success" && statistics && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Summary Row */}
          <AnalyticsOverview statistics={statistics} />

          {/* Visualizations Grid */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Radar Hero Card */}
            <div className="rounded-xl border border-border bg-card p-5 lg:col-span-1 flex flex-col justify-start space-y-4">
              <div>
                <h2 className="text-lg font-semibold">Subject Performance Radar</h2>
                <p className="text-sm text-muted-foreground">
                  Hover to view averages. Click keys to drill down.
                </p>
              </div>

              <RadarChart
                subjects={statistics.subjectStats ?? []}
                selectedSubject={selectedSubjectCode}
                onSelectSubject={setSelectedSubjectCode}
              />
            </div>

            {/* Bar comparison */}
            <div className="lg:col-span-2">
              <SubjectBarChart
                subjects={statistics.subjectStats ?? []}
                selectedSubject={selectedSubjectCode}
                onSelectSubject={setSelectedSubjectCode}
              />
            </div>
          </div>

          {/* Detailed breakdown section */}
          {selectedSubject && (
            <div className="animate-in slide-in-from-bottom-4 duration-300">
              <SubjectBreakdown subject={selectedSubject} />
            </div>
          )}
        </div>
      )}
    </AppShell>
  );
}
