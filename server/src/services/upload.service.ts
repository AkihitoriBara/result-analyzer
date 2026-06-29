import { ResultPdfParser } from "../parser/result-pdf.parser.js";

export class UploadService {
  private pdfParser = new ResultPdfParser();

  async uploadFile(file: Express.Multer.File) {
    const students = await this.pdfParser.extractText(file.path);

    return {
      success: true,
      message: "File uploaded successfully.",
      filename: file.filename,
      originalName: file.originalname,
      size: file.size,
      mimeType: file.mimetype,

      students,
    };
  }
}
