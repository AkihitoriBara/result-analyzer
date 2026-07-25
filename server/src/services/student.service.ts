import { StudentRepository } from "../database/repositories/student.repository.js";
import { AppError } from "../errors/app-error.js";

export class StudentService {
  private studentRepository = new StudentRepository();

  async getAllStudents() {
    return this.studentRepository.getAllStudents();
  }

  async getStudentResult(enrollment: string) {
    const student = await this.studentRepository.getStudentResult(enrollment);

    if (!student) {
      throw new AppError("Student not found.", 404);
    }

    if (student.results.length === 0) {
      throw new AppError("No results found for this student.", 404);
    }

    return student;
  }

  async searchByEnrollment(enrollment: string) {
    const students =
      await this.studentRepository.searchByEnrollment(enrollment);

    return students;
  }
}
