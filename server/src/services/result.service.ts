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

  async getAllResults() {
    const results = await this.resultRepository.getAllResults();

    if (results.length === 0) {
      throw new Error("No results found.");
    }

    return results.map((result) => ({
      id: result.id,

      enrollment: result.student.enrollment,
      rollNumber: result.student.rollNumber,

      semester: result.upload.semester,

      sgpa: result.sgpa,

      passed: result.passed,
    }));
  }
}
