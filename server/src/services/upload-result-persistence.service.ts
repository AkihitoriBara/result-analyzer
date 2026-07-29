import { StudentRepository } from "../database/repositories/student.repository.js";
import { ResultRepository } from "../database/repositories/result.repository.js";
import { SubjectRepository } from "../database/repositories/subject.repository.js";
import { StudentResult } from "../types/student.types.js";

type UploadCriteria = {
  minimumInternal: number;
  minimumExternal: number;
  minimumTotal: number | null;
};

type UploadRecord = {
  id: number;
};

export class UploadResultPersistenceService {
  private studentRepository = new StudentRepository();
  private resultRepository = new ResultRepository();
  private subjectRepository = new SubjectRepository();

  async persistStudents(
    students: StudentResult[],
    criteria: UploadCriteria,
    upload: UploadRecord,
  ) {
    for (const student of students) {
      const dbStudent = await this.studentRepository.upsertStudent(
        student.enrollment,
        student.rollNumber,
      );

      const passed =
        student.subjects.length > 0 &&
        student.subjects.every(
          (subject) =>
            subject.internal >= criteria.minimumInternal &&
            subject.external >= criteria.minimumExternal &&
            (criteria.minimumTotal == null ||
              subject.total >= criteria.minimumTotal),
        );

      const result = await this.resultRepository.createResult({
        studentId: dbStudent.id,
        uploadId: upload.id,
        sgpa: student.sgpa,
        totalCredits: student.totalCredits,
        totalGradePoints: student.totalGradePoints,
        passed,
      });

      for (const subject of student.subjects) {
        await this.subjectRepository.createSubject({
          resultId: result.id,

          subjectCode: subject.subjectCode,
          subjectName: subject.subjectName,

          internal: subject.internal,
          external: subject.external,
          total: subject.total,

          grade: subject.grade,

          credits: subject.credits,
          gradePoints: subject.gradePoints,
        });
      }
    }
  }
}
