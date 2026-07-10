import { Request, Response } from "express";
import { ResultService } from "../services/result.service.js";

export class ResultController {
  private resultService = new ResultService();

  async getAllResults(req: Request, res: Response) {
    const results = await this.resultService.getAllResults();

    return res.json({
      success: true,
      count: results.length,
      results,
    });
  }

  async getTopper(req: Request, res: Response) {
    const topper = await this.resultService.getTopper();

    return res.json({
      success: true,
      topper,
    });
  }

  async getTop10Toppers(req: Request, res: Response) {
    const toppers = await this.resultService.getTop10Toppers();

    return res.json({
      success: true,
      count: toppers.length,
      toppers,
    });
  }
}
