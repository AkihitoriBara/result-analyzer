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
}
