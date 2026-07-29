import { Prisma } from "@prisma/client";
import prisma from "../prisma.js";

export class ResultRepository {
  async createResult(
    data: {
      studentId: number;
      uploadId: number;

      sgpa: number;

      totalCredits: number;
      totalGradePoints: number;

      passed: boolean;
    },
    tx?: Prisma.TransactionClient,
  ) {
    const client = tx ?? prisma;
    return client.result.create({
      data,
    });
  }

  async createResultsAndReturn(
    data: Array<{
      studentId: number;
      uploadId: number;
      sgpa: number;
      totalCredits: number;
      totalGradePoints: number;
      passed: boolean;
    }>,
    tx?: Prisma.TransactionClient,
  ) {
    const client = tx ?? prisma;
    return client.result.createManyAndReturn({
      data,
    });
  }

  async getTopper() {
    return prisma.result.findFirst({
      orderBy: {
        sgpa: "desc",
      },

      include: {
        student: true,
        subjects: true,
      },
    });
  }

  async getTop10Toppers() {
    return prisma.result.findMany({
      orderBy: {
        sgpa: "desc",
      },

      take: 10,
      include: {
        student: true,
        upload: {
          select: {
            semester: true,
          },
        },
      },
    });
  }

  async getAllResults() {
    return prisma.result.findMany({
      orderBy: [
        {
          student: {
            enrollment: "asc",
          },
        },
      ],

      include: {
        student: {
          select: {
            enrollment: true,
            rollNumber: true,
          },
        },

        upload: {
          select: {
            semester: true,
          },
        },
      },
    });
  }
}
