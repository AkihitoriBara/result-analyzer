import { Prisma } from "@prisma/client";
import prisma from "../prisma.js";

export class SubjectRepository {
  async createSubject(
    data: {
      resultId: number;

      subjectCode: string;
      subjectName: string;

      internal: number;
      external: number;
      total: number;

      grade: string;

      credits: number;
      gradePoints: number;
    },
    tx?: Prisma.TransactionClient,
  ) {
    const client = tx ?? prisma;
    return client.subjectResult.create({
      data,
    });
  }

  async createSubjects(
    data: Array<{
      resultId: number;

      subjectCode: string;
      subjectName: string;

      internal: number;
      external: number;
      total: number;

      grade: string;

      credits: number;
      gradePoints: number;
    }>,
    tx?: Prisma.TransactionClient,
  ) {
    const client = tx ?? prisma;
    return client.subjectResult.createMany({
      data,
    });
  }
}
