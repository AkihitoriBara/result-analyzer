"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import {
  getTopStudents,
  TopStudent,
} from "@/services/dashboard.service";

import StudentRank from "./StudentRank";

type SectionStatus = "loading" | "success" | "empty" | "error";

export default function TopStudents() {
  const [students, setStudents] = useState<TopStudent[]>([]);
  const [status, setStatus] = useState<SectionStatus>("loading");

  useEffect(() => {
    async function loadTopStudents() {
      setStatus("loading");

      try {
        const data = await getTopStudents();

        setStudents(data);
        setStatus(data.length === 0 ? "empty" : "success");
      } catch (error) {
        console.error(error);
        setStudents([]);
        setStatus("error");
      }
    }

    loadTopStudents();
  }, []);

  return (
    <section className="rounded-2xl border border-border bg-card p-6 h-[480px] flex flex-col justify-between">
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(6, 182, 212, 0.15);
          border-radius: 9999px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(6, 182, 212, 0.35);
        }
      `}} />

      <div className="mb-6 flex-shrink-0">
        <h2 className="text-lg font-semibold">Top Students</h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Highest SGPA performers across imported results.
        </p>
      </div>

      {status === "loading" && (
        <div className="flex-1 rounded-xl border border-border p-6 text-sm text-muted-foreground">
          Loading top students...
        </div>
      )}

      {status === "error" && (
        <div className="flex-1 rounded-xl border border-red-500/20 bg-red-500/10 p-6 text-sm text-red-400">
          Failed to load top students.
        </div>
      )}

      {status === "empty" && (
        <div className="flex-1 rounded-xl border border-dashed border-border p-8 text-center flex flex-col items-center justify-center">
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

      {status === "success" && (
        <div className="flex-1 overflow-y-auto space-y-3 pr-1.5 custom-scrollbar">
          {students.map((student, index) => (
            <StudentRank
              key={student.id}
              rank={index + 1}
              enrollment={student.student.enrollment}
              rollNumber={student.student.rollNumber}
              semester={student.upload?.semester ?? 0}
              sgpa={student.sgpa}
            />
          ))}
        </div>
      )}

      {status === "success" && (
        <div className="mt-6 border-t border-border pt-4 flex-shrink-0">
          <Link
            href="/students"
            className="text-sm font-medium text-cyan-400 transition-colors hover:text-cyan-300"
          >
            View all students →
          </Link>
        </div>
      )}
    </section>
  );
}
