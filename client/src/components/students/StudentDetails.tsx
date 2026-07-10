"use client";

import { useEffect, useState } from "react";

import {
  getStudentDetails,
  StudentDetails as StudentDetailsType,
} from "@/services/student.service";

import SubjectTable from "./SubjectTable";
import ActionButtons from "./ActionButtons";
import StudentStatusBadge from "./StudentStatusBadge";

type StudentDetailsProps = {
  enrollment: string;
};

export default function StudentDetails({ enrollment }: StudentDetailsProps) {
  const [student, setStudent] = useState<StudentDetailsType | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStudent() {
      try {
        setLoading(true);

        const data = await getStudentDetails(enrollment);

        setStudent(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadStudent();
  }, [enrollment]);

  if (loading) {
    return (
      <div className="p-8 text-sm text-muted-foreground">
        Loading student details...
      </div>
    );
  }

  if (!student) {
    return (
      <div className="p-8 text-sm text-red-400">Failed to load student.</div>
    );
  }

  return (
    <div className="bg-muted/10 p-8">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-xl font-semibold">{student.enrollment}</h3>

          <p className="mt-1 text-sm text-muted-foreground">
            Roll Number {student.rollNumber}
          </p>
        </div>

        <ActionButtons />
      </div>

      <div className="mt-8 grid grid-cols-4 gap-6">
        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            Semester
          </p>

          <p className="mt-1 text-lg font-semibold">
            Semester {student.semester}
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            SGPA
          </p>

          <p className="mt-1 text-lg font-semibold">
            {student.sgpa.toFixed(2)}
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            Credits
          </p>

          <p className="mt-1 text-lg font-semibold">{student.totalCredits}</p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            Status
          </p>

          <div className="mt-2">
            <StudentStatusBadge passed={student.passed} />
          </div>
        </div>
      </div>

      <SubjectTable subjects={student.subjects} />
    </div>
  );
}
