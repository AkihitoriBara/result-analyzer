import { Router } from "express";
import { ResultController } from "../controllers/result.controller.js";

const router = Router();

const resultController = new ResultController();

router.get("/topper", (req, res) => resultController.getTopper(req, res));

router.get("/top10", (req, res) => resultController.getTop10Toppers(req, res));

export default router;
