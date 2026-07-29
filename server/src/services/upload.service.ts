import { unlink } from "node:fs/promises";
import path from "node:path";

import { ResultPdfParser } from "../parser/result-pdf.parser.js";

import { UploadRepository } from "../database/repositories/upload.repository.js";
import { PassCriteriaRepository } from "../database/repositories/pass-criteria.repository.js";
import { AppError } from "../errors/app-error.js";
import { UploadResultPersistenceService } from "./upload-result-persistence.service.js";

export class UploadService {
  private pdfParser = new ResultPdfParser();

  private uploadRepository = new UploadRepository();
  private passCriteriaRepository = new PassCriteriaRepository();
  private uploadResultPersistenceService = new UploadResultPersistenceService();

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

    // 4. Persist parsed students and their results
    await this.uploadResultPersistenceService.persistStudents(
      students,
      criteria,
      upload,
    );

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

  async deleteUpload(uploadId: number) {
    const deletedUpload = await this.uploadRepository.deleteUpload(uploadId);

    if (!deletedUpload) {
      throw new AppError("Upload not found.", 404);
    }

    const filePath = path.join(
      process.cwd(),
      "src",
      "uploads",
      deletedUpload.fileName,
    );

    try {
      await unlink(filePath);
    } catch (error) {
      const fileError = error as NodeJS.ErrnoException;

      if (fileError.code !== "ENOENT") {
        console.error("Failed to delete uploaded file:", fileError.message);
      }
    }

    return {
      success: true,
      message: "Upload deleted successfully.",
      deletedUpload,
    };
  }
}
