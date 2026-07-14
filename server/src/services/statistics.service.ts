import { StatisticsRepository } from "../database/repositories/statistics.repository.js";

type SubjectTopper = {
  enrollment: string;
  rollNumber: string;
  total: number;
};

type SubjectAccumulator = {
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
  topperStudent: SubjectTopper | null;
};

type SubjectStatistics = {
  subjectCode: string;
  subjectName: string;

  averageInternal: number;
  averageExternal: number;
  averageTotal: number;
  averageGradePoints: number;

  passPercentage: number;

  totalStudents: number;
  passedStudents: number;
  failedStudents: number;

  gradeDistribution: Record<string, number>;

  topper: SubjectTopper | null;
};

type SubjectHighlights = {
  hardestSubject: SubjectStatistics | null;
  easiestSubject: SubjectStatistics | null;
  highestAverageSubject: SubjectStatistics | null;
  lowestAverageSubject: SubjectStatistics | null;
};

function createEmptyGradeDistribution(): Record<string, number> {
  return {
    O: 0,
    "A+": 0,
    A: 0,
    "B+": 0,
    B: 0,
    C: 0,
    D: 0,
    F: 0,
  };
}

export class StatisticsService {
  private statisticsRepository = new StatisticsRepository();

  private round(value: number): number {
    return Number(value.toFixed(2));
  }

  private buildSubjectStatistics(subjectResults: any[]): SubjectStatistics[] {
    const subjectStatsMap: Record<string, SubjectAccumulator> = {};

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
          gradeCounts: createEmptyGradeDistribution(),
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

      const trimmedGrade = subRes.grade.trim();
      stat.gradeCounts[trimmedGrade] =
        (stat.gradeCounts[trimmedGrade] ?? 0) + 1;

      const criteria = subRes.result.upload.criteria;

      const passed =
        subRes.internal >= criteria.minimumInternal &&
        subRes.external >= criteria.minimumExternal &&
        (criteria.minimumTotal == null ||
          subRes.total >= criteria.minimumTotal);

      if (passed) {
        stat.passedStudents += 1;
      }

      if (subRes.total > stat.highestTotal) {
        stat.highestTotal = subRes.total;

        stat.topperStudent = {
          enrollment: subRes.result.student.enrollment,
          rollNumber: subRes.result.student.rollNumber,
          total: subRes.total,
        };
      }
    }

    return Object.values(subjectStatsMap).map((s) => {
      const totalCount = s.totalStudents || 1;

      return {
        subjectCode: s.subjectCode,
        subjectName: s.subjectName,

        averageInternal: this.round(s.totalInternal / totalCount),
        averageExternal: this.round(s.totalExternal / totalCount),
        averageTotal: this.round(s.totalTotal / totalCount),
        averageGradePoints: this.round(s.totalGradePoints / totalCount),

        passPercentage: this.round(
          (s.passedStudents / totalCount) * 100
        ),

        totalStudents: s.totalStudents,
        passedStudents: s.passedStudents,
        failedStudents: s.totalStudents - s.passedStudents,

        gradeDistribution: s.gradeCounts,

        topper: s.topperStudent,
      };
    });
  }

  private findSubjectHighlights(
    subjectStats: SubjectStatistics[],
  ): SubjectHighlights {

    if (subjectStats.length === 0) {
      return {
        hardestSubject: null,
        easiestSubject: null,
        highestAverageSubject: null,
        lowestAverageSubject: null,
      };
    }

    let hardestSubject = subjectStats[0];
    let easiestSubject = subjectStats[0];
    let highestAverageSubject = subjectStats[0];
    let lowestAverageSubject = subjectStats[0];

    for (const subject of subjectStats) {

      if (subject.passPercentage < hardestSubject.passPercentage) {
        hardestSubject = subject;
      }

      if (subject.passPercentage > easiestSubject.passPercentage) {
        easiestSubject = subject;
      }

      if (subject.averageTotal > highestAverageSubject.averageTotal) {
        highestAverageSubject = subject;
      }

      if (subject.averageTotal < lowestAverageSubject.averageTotal) {
        lowestAverageSubject = subject;
      }
    }

    return {
      hardestSubject,
      easiestSubject,
      highestAverageSubject,
      lowestAverageSubject,
    };
  }

  async getStatistics() {
    const statistics = await this.statisticsRepository.getStatistics();

    const passPercentage =
      statistics.totalStudents === 0
        ? 0
        : this.round(
          (
            (statistics.passedStudents / statistics.totalStudents) *
            100
          ),
        );

    const subjectResults = await this.statisticsRepository.getSubjectResultsWithDetails();

    const subjectStats = this.buildSubjectStatistics(subjectResults);

    const {
      hardestSubject,
      easiestSubject,
      highestAverageSubject,
      lowestAverageSubject,
    } = this.findSubjectHighlights(subjectStats);

    return {
      ...statistics,

      averageSGPA: this.round(statistics.averageSGPA),
      highestSGPA: this.round(statistics.highestSGPA),
      lowestSGPA: this.round(statistics.lowestSGPA),

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
