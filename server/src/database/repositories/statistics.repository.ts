import prisma from "../prisma.js";

export class StatisticsRepository {
  async getStatistics() {
    const totalStudents = await prisma.student.count();

    const passedStudents = await prisma.result.count({
      where: {
        passed: true,
      },
    });

    const failedStudents = await prisma.result.count({
      where: {
        passed: false,
      },
    });

    const sgpaStats = await prisma.result.aggregate({
      _avg: {
        sgpa: true,
      },

      _max: {
        sgpa: true,
      },

      _min: {
        sgpa: true,
      },
    });

    return {
      totalStudents,
      passedStudents,
      failedStudents,

      averageSGPA: sgpaStats._avg.sgpa ?? 0,
      highestSGPA: sgpaStats._max.sgpa ?? 0,
      lowestSGPA: sgpaStats._min.sgpa ?? 0,
    };
  }
}
