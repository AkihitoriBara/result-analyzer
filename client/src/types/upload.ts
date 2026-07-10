export interface Upload {
  id: number;

  fileName: string;
  originalFileName: string;

  semester: number;
  academicYear: string;

  uploadedAt: string;

  archived: boolean;

  createdAt: string;
  updatedAt: string;
}
