import { NextFunction, Request, Response } from "express";
import { ResultService } from "../services/result.service.js";

export class ResultController {
  private resultService = new ResultService();

  async getAllResults(req: Request, res: Response, next: NextFunction) {
    try {
      const results = await this.resultService.getAllResults();

      return res.json({
        success: true,
        count: results.length,
        results,
      });
    } catch (error) {
      next(error);
    }
  }

  async getTopper(req: Request, res: Response, next: NextFunction) {
    try {
      const topper = await this.resultService.getTopper();

      return res.json({
        success: true,
        topper,
      });
    } catch (error) {
      next(error);
    }
  }

  async getTop10Toppers(req: Request, res: Response, next: NextFunction) {
    try {
      const toppers = await this.resultService.getTop10Toppers();

      return res.json({
        success: true,
        count: toppers.length,
        toppers,
      });
    } catch (error) {
      next(error);
    }
  }
}
