import PDFParser from "pdf2json";
import { StudentParser } from "./student.parser.js";
import { StudentResult } from "../types/student.types.js";

export class ResultPdfParser {
  private studentParser = new StudentParser();

  async extractText(filePath: string): Promise<StudentResult[]> {
    return new Promise((resolve, reject) => {
      const pdfParser = new PDFParser();

      pdfParser.on("pdfParser_dataError", (errData: any) => {
        reject(errData);
      });

      pdfParser.on("pdfParser_dataReady", (pdfData: any) => {
        const words: string[] = [];

        for (const page of pdfData.Pages) {
          for (const text of page.Texts) {
            for (const run of text.R) {
              words.push(decodeURIComponent(run.T));
            }
          }
        }

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
