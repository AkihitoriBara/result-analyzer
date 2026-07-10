"use client";

import { useEffect, useState } from "react";

import {
  getStudentResults,
  searchStudent,
  StudentResultRow,
} from "@/services/student.service";

import StudentRow from "./StudentRow";
import LoadingState from "./LoadingState";
import EmptyState from "./EmptyState";

type StudentTableProps = {
  search: string;
};

export default function StudentTable({ search }: StudentTableProps) {
  const [students, setStudents] = useState<StudentResultRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedEnrollment, setExpandedEnrollment] = useState<string | null>(
    null,
  );

  useEffect(() => {
    const timeout = setTimeout(async () => {
      setLoading(true);

      try {
        const results =
          search.trim() === ""
            ? await getStudentResults()
            : await searchStudent(search);

        setStudents(results);
      } catch (error) {
        console.error(error);
        setStudents([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [search]);

  if (loading) {
    return <LoadingState />;
  }

  if (students.length === 0) {
    return <EmptyState />;
  }

  function toggleStudent(enrollment: string) {
    if (expandedEnrollment === enrollment) {
      setExpandedEnrollment(null);
    } else {
      setExpandedEnrollment(enrollment);
    }
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-border bg-muted/40 text-left">
            <th className="px-6 py-4 text-sm font-semibold">Enrollment</th>

            <th className="px-6 py-4 text-sm font-semibold">Roll Number</th>

            <th className="px-6 py-4 text-sm font-semibold">Semester</th>

            <th className="px-6 py-4 text-sm font-semibold">SGPA</th>

            <th className="px-6 py-4 text-sm font-semibold">Status</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student) => (
            <StudentRow
              key={student.id}
              student={student}
              expanded={expandedEnrollment === student.enrollment}
              onToggle={() => toggleStudent(student.enrollment)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
