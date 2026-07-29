import { Router } from "express";
import { ResultController } from "../controllers/result.controller.js";

const router = Router();

const resultController = new ResultController();

router.get("/", (req, res, next) =>
  resultController.getAllResults(req, res, next),
);

router.get("/topper", (req, res, next) =>
  resultController.getTopper(req, res, next),
);

router.get("/top10", (req, res, next) =>
  resultController.getTop10Toppers(req, res, next),
);

export default router;
