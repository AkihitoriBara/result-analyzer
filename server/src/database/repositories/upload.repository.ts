import prisma from "../prisma.js";

export class UploadRepository {
  async createUpload(data: {
    fileName: string;
    originalFileName: string;
    semester: number;
    academicYear: string;
    criteriaId: number;
  }) {
    return prisma.upload.create({
      data,
    });
  }
  async getAllUploads() {
    return prisma.upload.findMany({
      orderBy: {
        uploadedAt: "desc",
      },
    });
  }
}
