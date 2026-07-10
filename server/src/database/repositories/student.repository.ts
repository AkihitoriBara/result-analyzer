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

            upload: {
              select: {
                semester: true,
              },
            },
          },

          orderBy: {
            createdAt: "desc",
          },

          take: 1,
        },
      },
    });
  }

  async searchByEnrollment(enrollment: string) {
    return prisma.student.findMany({
      where: {
        enrollment: {
          startsWith: enrollment,
        },
      },

      include: {
        results: {
          include: {
            upload: {
              select: {
                semester: true,
              },
            },
          },

          orderBy: {
            createdAt: "desc",
          },

          take: 1,
        },
      },

      orderBy: {
        enrollment: "asc",
      },
    });
  }
}
