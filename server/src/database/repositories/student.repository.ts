import prisma from "../prisma.js";

export class StudentRepository {
  async findByEnrollment(enrollment: string) {
    return prisma.student.findUnique({
      where: {
        enrollment,
      },
    });
  }

  async createStudent(enrollment: string, rollNumber: string) {
    return prisma.student.create({
      data: {
        enrollment,
        rollNumber,
      },
    });
  }

  async findOrCreateStudent(enrollment: string, rollNumber: string) {
    const existing = await this.findByEnrollment(enrollment);

    if (existing) {
      return existing;
    }

    return this.createStudent(enrollment, rollNumber);
  }
}
