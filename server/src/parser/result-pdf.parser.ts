import PDFParser from "pdf2json";
import { StudentParser } from "./student.parser.js";
import { StudentResult } from "../types/student.types.js";

export class ResultPdfParser {
  private studentParser = new StudentParser();

  async extractText(filePath: string): Promise<StudentResult[]> {
    return new Promise((resolve, reject) => {
      const pdfParser = new PDFParser();

      // Handle PDF parsing errors
      pdfParser.on("pdfParser_dataError", (errData: any) => {
        reject(errData);
      });

      // PDF successfully parsed
      pdfParser.on("pdfParser_dataReady", (pdfData: any) => {
        // Store every decoded word from the PDF
        const words: string[] = [];

        // Read every page
        for (const page of pdfData.Pages) {
          // Read every text block
          for (const text of page.Texts) {
            // Read every text run
            for (const run of text.R) {
              // Decode special characters (%20 etc.)
              const value = decodeURIComponent(run.T);

              // Save the decoded word
              words.push(value);
            }
          }
        }

        // Split all words into individual students
        const students = this.studentParser.splitStudents(words);

        // Debug output
        console.log("====================================");
        console.log("Total students:", students.length);
        console.log("====================================");
        console.log("First student:");
        console.log(students[0]);
        console.log("====================================");

        // Return the students as JSON for now
        const parsedStudents = students.map((student) =>
          this.studentParser.parse(student),
        );

        // Return the array itself
        resolve(parsedStudents);
      });

      // Start reading the PDF
      pdfParser.loadPDF(filePath);
    });
  }
}
