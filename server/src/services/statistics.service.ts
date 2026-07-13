import { StatisticsRepository } from "../database/repositories/statistics.repository.js";

export class StatisticsService {
  private statisticsRepository = new StatisticsRepository();

  async getStatistics() {
    const statistics = await this.statisticsRepository.getStatistics();

    const passPercentage =
      statistics.totalStudents === 0
        ? 0
        : Number(
            (
              (statistics.passedStudents / statistics.totalStudents) *
              100
            ).toFixed(2),
          );

    const subjectResults = await this.statisticsRepository.getSubjectResultsWithDetails();

    const subjectStatsMap: Record<string, {
      subjectCode: string;
      subjectName: string;
      totalInternal: number;
      totalExternal: number;
      totalTotal: number;
      totalGradePoints: number;
      totalStudents: number;
      passedStudents: number;
      gradeCounts: Record<string, number>;
      highestTotal: number;
      topperStudent: { enrollment: string; rollNumber: string; total: number } | null;
    }> = {};

    for (const subRes of subjectResults) {
      const code = subRes.subjectCode;
      const name = subRes.subjectName;

      if (!subjectStatsMap[code]) {
        subjectStatsMap[code] = {
          subjectCode: code,
          subjectName: name,
          totalInternal: 0,
          totalExternal: 0,
          totalTotal: 0,
          totalGradePoints: 0,
          totalStudents: 0,
          passedStudents: 0,
          gradeCounts: { O: 0, "A+": 0, A: 0, "B+": 0, B: 0, C: 0, D: 0, F: 0 },
          highestTotal: -1,
          topperStudent: null,
        };
      }

      const stat = subjectStatsMap[code];
      stat.totalInternal += subRes.internal;
      stat.totalExternal += subRes.external;
      stat.totalTotal += subRes.total;
      stat.totalGradePoints += subRes.gradePoints;
      stat.totalStudents += 1;

      // Grade counts
      const trimmedGrade = subRes.grade.trim();
      stat.gradeCounts[trimmedGrade] = (stat.gradeCounts[trimmedGrade] ?? 0) + 1;

      // Check subject pass criteria
      const criteria = subRes.result.upload.criteria;
      const passed =
        subRes.internal >= criteria.minimumInternal &&
        subRes.external >= criteria.minimumExternal &&
        (criteria.minimumTotal == null || subRes.total >= criteria.minimumTotal);

      if (passed) {
        stat.passedStudents += 1;
      }

      // Check topper
      if (subRes.total > stat.highestTotal) {
        stat.highestTotal = subRes.total;
        stat.topperStudent = {
          enrollment: subRes.result.student.enrollment,
          rollNumber: subRes.result.student.rollNumber,
          total: subRes.total,
        };
      }
    }

    const subjectStats = Object.values(subjectStatsMap).map((s) => {
      const totalCount = s.totalStudents || 1;
      return {
        subjectCode: s.subjectCode,
        subjectName: s.subjectName,
        averageInternal: Number((s.totalInternal / totalCount).toFixed(2)),
        averageExternal: Number((s.totalExternal / totalCount).toFixed(2)),
        averageTotal: Number((s.totalTotal / totalCount).toFixed(2)),
        averageGradePoints: Number((s.totalGradePoints / totalCount).toFixed(2)),
        passPercentage: Number(((s.passedStudents / totalCount) * 100).toFixed(2)),
        totalStudents: s.totalStudents,
        passedStudents: s.passedStudents,
        failedStudents: s.totalStudents - s.passedStudents,
        gradeDistribution: s.gradeCounts,
        topper: s.topperStudent,
      };
    });

    let hardestSubject: any = null;
    let easiestSubject: any = null;
    let highestAverageSubject: any = null;
    let lowestAverageSubject: any = null;

    if (subjectStats.length > 0) {
      hardestSubject = [...subjectStats].sort((a, b) => a.passPercentage - b.passPercentage)[0];
      easiestSubject = [...subjectStats].sort((a, b) => b.passPercentage - a.passPercentage)[0];
      highestAverageSubject = [...subjectStats].sort((a, b) => b.averageTotal - a.averageTotal)[0];
      lowestAverageSubject = [...subjectStats].sort((a, b) => a.averageTotal - b.averageTotal)[0];
    }

    return {
      ...statistics,

      averageSGPA: Number(statistics.averageSGPA.toFixed(2)),
      highestSGPA: Number(statistics.highestSGPA.toFixed(2)),
      lowestSGPA: Number(statistics.lowestSGPA.toFixed(2)),

      passPercentage,

      subjectStats,
      hardestSubject: hardestSubject ? {
        subjectCode: hardestSubject.subjectCode,
        subjectName: hardestSubject.subjectName,
        passPercentage: hardestSubject.passPercentage,
      } : null,
      easiestSubject: easiestSubject ? {
        subjectCode: easiestSubject.subjectCode,
        subjectName: easiestSubject.subjectName,
        passPercentage: easiestSubject.passPercentage,
      } : null,
      highestAverageSubject: highestAverageSubject ? {
        subjectCode: highestAverageSubject.subjectCode,
        subjectName: highestAverageSubject.subjectName,
        averageTotal: highestAverageSubject.averageTotal,
      } : null,
      lowestAverageSubject: lowestAverageSubject ? {
        subjectCode: lowestAverageSubject.subjectCode,
        subjectName: lowestAverageSubject.subjectName,
        averageTotal: lowestAverageSubject.averageTotal,
      } : null,
    };
  }
}
