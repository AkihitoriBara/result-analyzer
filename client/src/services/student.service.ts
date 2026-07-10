const API_URL = "http://localhost:5000/api";

export interface StudentResultRow {
  id: number;

  enrollment: string;
  rollNumber: string;

  semester: number;

  sgpa: number;

  passed: boolean;
}

export async function getStudentResults(): Promise<StudentResultRow[]> {
  const response = await fetch(`${API_URL}/results`);

  if (!response.ok) {
    throw new Error("Failed to fetch students.");
  }

  const data = await response.json();

  return data.results;
}

export async function searchStudent(
  enrollment: string,
): Promise<StudentResultRow[]> {
  if (enrollment.trim() === "") {
    return getStudentResults();
  }

  const response = await fetch(
    `${API_URL}/students/search?enrollment=${enrollment}`,
  );

  if (!response.ok) {
    return [];
  }

  const data = await response.json();

  return data.students.map((student: any) => ({
    id: student.id,
    enrollment: student.enrollment,
    rollNumber: student.rollNumber,
    semester: student.results?.[0]?.upload?.semester ?? 4,
    sgpa: student.results?.[0]?.sgpa ?? 0,
    passed: student.results?.[0]?.passed ?? false,
  }));
}

export interface SubjectResult {
  subjectCode: string;
  subjectName: string;

  internal: number;
  external: number;
  total: number;

  grade: string;

  credits: number;
}

export interface StudentDetails {
  enrollment: string;
  rollNumber: string;

  sgpa: number;

  totalCredits: number;

  passed: boolean;

  semester: number;

  subjects: SubjectResult[];
}

export async function getStudentDetails(
  enrollment: string,
): Promise<StudentDetails> {
  const response = await fetch(`${API_URL}/students/${enrollment}`);

  if (!response.ok) {
    throw new Error("Failed to load student.");
  }

  const data = await response.json();

  const result = data.student.results[0];

  return {
    enrollment: data.student.enrollment,

    rollNumber: data.student.rollNumber,

    sgpa: result.sgpa,

    totalCredits: result.totalCredits,

    passed: result.passed,

    semester: result.upload.semester,

    subjects: result.subjects,
  };
}
