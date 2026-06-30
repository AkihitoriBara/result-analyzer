import { ResultPdfParser } from "../parser/result-pdf.parser.js";

import { StudentRepository } from "../database/repositories/student.repository.js";
import { UploadRepository } from "../database/repositories/upload.repository.js";
import { PassCriteriaRepository } from "../database/repositories/pass-criteria.repository.js";

export class UploadService {
  private pdfParser = new ResultPdfParser();

  private studentRepository = new StudentRepository();
  private uploadRepository = new UploadRepository();
  private passCriteriaRepository = new PassCriteriaRepository();

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

    // 4. Save students
    for (const student of students) {
      await this.studentRepository.findOrCreateStudent(
        student.enrollment,
        student.rollNumber,
      );
    }

    // 5. Return response
    return {
      success: true,
      message: "File uploaded successfully.",

      upload,
      criteria,

      totalStudents: students.length,

      students,
    };
  }
}
