import { NextFunction, Request, Response } from "express";
import { StudentService } from "../services/student.service.js";
import { AppError } from "../errors/app-error.js";

export class StudentController {
  private studentService = new StudentService();

  async getAllStudents(req: Request, res: Response, next: NextFunction) {
    try {
      const students = await this.studentService.getAllStudents();

      return res.json({
        success: true,
        count: students.length,
        students,
      });
    } catch (error) {
      next(error);
    }
  }

  async getStudentResult(req: Request, res: Response, next: NextFunction) {
    const enrollment = req.params.enrollment as string;

    try {
      const student = await this.studentService.getStudentResult(enrollment);

      return res.json({
        success: true,
        student,
      });
    } catch (error) {
      next(error);
    }
  }

  async searchByEnrollment(req: Request, res: Response, next: NextFunction) {
    const { enrollment } = req.query;

    if (typeof enrollment !== "string") {
      return next(new AppError("Enrollment number is required.", 400));
    }

    try {
      const students = await this.studentService.searchByEnrollment(enrollment);

      return res.json({
        success: true,
        count: students.length,
        students,
      });
    } catch (error) {
      next(error);
    }
  }
}
