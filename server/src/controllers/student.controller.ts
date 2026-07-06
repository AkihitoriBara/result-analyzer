import { Request, Response } from "express";
import { StudentService } from "../services/student.service.js";

export class StudentController {
  private studentService = new StudentService();

  async getAllStudents(req: Request, res: Response) {
    const students = await this.studentService.getAllStudents();

    return res.json({
      success: true,
      count: students.length,
      students,
    });
  }

  async getStudentResult(req: Request, res: Response) {
    const enrollment = req.params.enrollment as string;

    const student = await this.studentService.getStudentResult(enrollment);

    return res.json({
      success: true,
      student,
    });
  }
}
