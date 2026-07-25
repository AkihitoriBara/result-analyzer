import { Router } from "express";
import { StatisticsController } from "../controllers/statistics.controller.js";

const router = Router();

const statisticsController = new StatisticsController();

router.get("/", (req, res, next) =>
  statisticsController.getStatistics(req, res, next),
);

export default router;
