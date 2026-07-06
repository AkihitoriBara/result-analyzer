import { StudentRepository } from "../database/repositories/student.repository.js";

export class StudentService {
  private studentRepository = new StudentRepository();

  async getAllStudents() {
    return this.studentRepository.getAllStudents();
  }

  async getStudentResult(enrollment: string) {
    const student = await this.studentRepository.getStudentResult(enrollment);

    if (!student) {
      throw new Error("Student not found.");
    }

    if (student.results.length === 0) {
      throw new Error("No results found for this student.");
    }

    return student;
  }
}
