import { Router } from "express";
import { StudentController } from "../controllers/student.controller.js";
import { validateEnrollmentQuery } from "../middleware/validation.middleware.js";

const router = Router();

const studentController = new StudentController();

router.get("/", (req, res, next) =>
  studentController.getAllStudents(req, res, next),
);

router.get("/search", validateEnrollmentQuery, (req, res, next) =>
  studentController.searchByEnrollment(req, res, next),
);

router.get("/:enrollment", (req, res, next) =>
  studentController.getStudentResult(req, res, next),
);

export default router;
