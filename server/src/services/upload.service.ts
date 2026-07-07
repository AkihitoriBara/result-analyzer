import { ResultPdfParser } from "../parser/result-pdf.parser.js";

import { StudentRepository } from "../database/repositories/student.repository.js";
import { UploadRepository } from "../database/repositories/upload.repository.js";
import { PassCriteriaRepository } from "../database/repositories/pass-criteria.repository.js";
import { ResultRepository } from "../database/repositories/result.repository.js";
import { SubjectRepository } from "../database/repositories/subject.repository.js";

export class UploadService {
  private pdfParser = new ResultPdfParser();

  private studentRepository = new StudentRepository();
  private uploadRepository = new UploadRepository();
  private passCriteriaRepository = new PassCriteriaRepository();
  private resultRepository = new ResultRepository();
  private subjectRepository = new SubjectRepository();

  async uploadFile(file: Express.Multer.File) {
    // 1. Save pass criteria
    const criteria = await this.passCriteriaRepository.createCriteria({
      minimumInternal: 24,
      minimumExternal: 16,
      minimumTotal: 40,
    });

    // 2. Save upload
    const upload = await this.uploadRepository.createUpload({
      fileName: file.filename,
      originalFileName: file.originalname,

      semester: 4,
      academicYear: "2025-26",

      criteriaId: criteria.id,
    });

    // 3. Parse the PDF
    const students = await this.pdfParser.extractText(file.path);

    // 4. Save only the debug student
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

    return {
      success: true,
      message: "File uploaded successfully.",

      upload,
      criteria,

      totalStudents: students.length,
    };
  }

  async getAllUploads() {
    return this.uploadRepository.getAllUploads();
  }
}
