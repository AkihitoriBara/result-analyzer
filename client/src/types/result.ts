import { Student } from "./student";

export interface Result {
  id: number;

  sgpa: number;

  totalCredits: number;
  totalGradePoints: number;

  passed: boolean;

  createdAt: string;
  updatedAt: string;

  student: Student;
}
