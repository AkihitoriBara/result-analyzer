export interface SubjectResult {
  id: number;

  subjectCode: string;
  subjectName: string;

  internal: number;
  external: number;
  total: number;

  grade: string;

  credits: number;
  gradePoints: number;

  createdAt: string;
  updatedAt: string;
}
