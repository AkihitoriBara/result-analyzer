import prisma from "../prisma.js";

export class SubjectRepository {
  async createSubject(data: {
    resultId: number;

    subjectCode: string;
    subjectName: string;

    internal: number;
    external: number;
    total: number;

    grade: string;

    credits: number;
    gradePoints: number;
  }) {
    return prisma.subjectResult.create({
      data,
    });
  }
}
