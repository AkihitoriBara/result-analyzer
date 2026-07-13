import { Upload } from "@/types/upload";

const API_URL = "http://localhost:5000/api";

export type SubjectTopper = {
  enrollment: string;
  rollNumber: string;
  total: number;
};

export type SubjectStats = {
  subjectCode: string;
  subjectName: string;
  averageInternal: number;
  averageExternal: number;
  averageTotal: number;
  averageGradePoints: number;
  passPercentage: number;
  totalStudents: number;
  passedStudents: number;
  failedStudents: number;
  gradeDistribution: Record<string, number>;
  topper: SubjectTopper | null;
};

export type DashboardStatistics = {
  totalStudents: number;
  passedStudents: number;
  failedStudents: number;
  averageSGPA: number;
  highestSGPA: number;
  lowestSGPA: number;
  passPercentage: number;
  subjectStats?: SubjectStats[];
  hardestSubject?: {
    subjectCode: string;
    subjectName: string;
    passPercentage: number;
  } | null;
  easiestSubject?: {
    subjectCode: string;
    subjectName: string;
    passPercentage: number;
  } | null;
  highestAverageSubject?: {
    subjectCode: string;
    subjectName: string;
    averageTotal: number;
  } | null;
  lowestAverageSubject?: {
    subjectCode: string;
    subjectName: string;
    averageTotal: number;
  } | null;
};

export type TopStudent = {
  id: number;
  sgpa: number;
  student: {
    enrollment: string;
    rollNumber: string;
  };
  upload: {
    semester: number;
  };
};

export type RecentUpload = {
  id: number;
  fileName: string;
  semester: number;
  uploadedAt: string;
  studentCount: number;
};

type StatisticsResponse = {
  statistics: DashboardStatistics;
};

type TopStudentsResponse = {
  toppers: TopStudent[];
};

type UploadWithCount = Upload & {
  _count?: {
    results: number;
  };
};

type UploadsResponse = {
  uploads: UploadWithCount[];
};

export async function getDashboardStatistics(): Promise<DashboardStatistics> {
  const response = await fetch(`${API_URL}/statistics`);

  if (!response.ok) {
    throw new Error("Failed to load dashboard statistics.");
  }

  const data: StatisticsResponse = await response.json();

  return data.statistics;
}

export async function getTopStudents(): Promise<TopStudent[]> {
  const response = await fetch(`${API_URL}/results/top10`);

  if (!response.ok) {
    throw new Error("Failed to load top students.");
  }

  const data: TopStudentsResponse = await response.json();

  return data.toppers ?? [];
}

export async function getRecentUploads(): Promise<RecentUpload[]> {
  const response = await fetch(`${API_URL}/uploads`);

  if (!response.ok) {
    throw new Error("Failed to load recent uploads.");
  }

  const data: UploadsResponse = await response.json();

  return data.uploads.slice(0, 5).map((upload) => ({
    id: upload.id,
    fileName: upload.originalFileName,
    semester: upload.semester,
    uploadedAt: upload.uploadedAt,
    studentCount: upload._count?.results ?? 0,
  }));
}
