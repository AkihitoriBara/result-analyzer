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

    return {
      ...statistics,

      averageSGPA: Number(statistics.averageSGPA.toFixed(2)),
      highestSGPA: Number(statistics.highestSGPA.toFixed(2)),
      lowestSGPA: Number(statistics.lowestSGPA.toFixed(2)),

      passPercentage,
    };
  }
}
