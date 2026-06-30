import prisma from "../prisma.js";

export class PassCriteriaRepository {
  async createCriteria(data: {
    minimumInternal: number;
    minimumExternal: number;
    minimumTotal?: number;
  }) {
    return prisma.passCriteria.create({
      data,
    });
  }
}
