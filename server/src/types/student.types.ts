export interface SubjectResult {
  subjectCode: string;
  subjectName: string;

  internal: number;
  external: number;
  total: number;

  grade: string;

  credits: number;
  gradePoints: number;
}

export interface StudentResult {
  enrollment: string;
  rollNumber: string;

  subjects: SubjectResult[];

  totalCredits: number;
  totalGradePoints: number;

  sgpa: number;
}
