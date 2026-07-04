import prisma from "../prisma.js";

export class ResultRepository {
  async createResult(data: {
    studentId: number;
    uploadId: number;

    sgpa: number;

    totalCredits: number;
    totalGradePoints: number;

    passed: boolean;
  }) {
    return prisma.result.create({
      data,
    });
  }
}
