import prisma from "../prisma.js";

export class StudentRepository {
  async upsertStudent(enrollment: string, rollNumber: string) {
    return prisma.student.upsert({
      where: {
        enrollment,
      },

      update: {
        rollNumber,
      },

      create: {
        enrollment,
        rollNumber,
      },
    });
  }
  async getAllStudents() {
    return prisma.student.findMany({
      orderBy: {
        enrollment: "asc",
      },
    });
  }
  async getStudentResult(enrollment: string) {
    return prisma.student.findUnique({
      where: {
        enrollment,
      },

      include: {
        results: {
          include: {
            subjects: true,
          },

          orderBy: {
            createdAt: "desc",
          },

          take: 1,
        },
      },
    });
  }
}
