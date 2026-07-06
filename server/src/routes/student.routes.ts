import { Router } from "express";
import { StudentController } from "../controllers/student.controller.js";

const router = Router();

const studentController = new StudentController();

router.get("/", (req, res) => studentController.getAllStudents(req, res));

router.get("/:enrollment", (req, res) =>
  studentController.getStudentResult(req, res),
);

export default router;
