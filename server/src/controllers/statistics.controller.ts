import { NextFunction, Request, Response } from "express";
import { StatisticsService } from "../services/statistics.service.js";

export class StatisticsController {
  private statisticsService = new StatisticsService();

  async getStatistics(req: Request, res: Response, next: NextFunction) {
    try {
      const statistics = await this.statisticsService.getStatistics();

      return res.json({
        success: true,
        statistics,
      });
    } catch (error) {
      next(error);
    }
  }
}
