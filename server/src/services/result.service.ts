import { ResultRepository } from "../database/repositories/result.repository.js";

export class ResultService {
  private resultRepository = new ResultRepository();

  async getTopper() {
    const topper = await this.resultRepository.getTopper();

    if (!topper) {
      throw new Error("No results found.");
    }

    return topper;
  }

  async getTop10Toppers() {
    const toppers = await this.resultRepository.getTop10Toppers();

    if (!toppers || toppers.length === 0) {
      throw new Error("No results found.");
    }

    return toppers;
  }
}
