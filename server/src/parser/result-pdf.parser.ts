import PDFParser from "pdf2json";
import { StudentParser } from "./student.parser.js";
import { StudentResult } from "../types/student.types.js";
import { PdfTokenExtractor } from "./pdf-token-extractor.js";
import { TokenNormalizer } from "./token-normalizer.js";

export class ResultPdfParser {
  private studentParser = new StudentParser();
  private tokenExtractor = new PdfTokenExtractor();
  private tokenNormalizer = new TokenNormalizer();

  async extractText(filePath: string): Promise<StudentResult[]> {
    return new Promise((resolve, reject) => {
      const pdfParser = new PDFParser();

      pdfParser.on("pdfParser_dataError", (errData: any) => {
        reject(errData);
      });

      pdfParser.on("pdfParser_dataReady", (pdfData: any) => {
        const tokens = this.tokenExtractor.extract(pdfData);
        const words = this.tokenNormalizer.toWords(tokens);

        const students = this.studentParser.splitStudents(words);

        const parsedStudents = students.map((student) =>
          this.studentParser.parse(student),
        );

        resolve(parsedStudents);
      });

      pdfParser.loadPDF(filePath);
    });
  }
}
