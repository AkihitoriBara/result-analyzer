import { PdfToken } from "./parser.types.js";
import {
  DocumentLayout,
  LayoutColumnBand,
  LayoutRow,
  PageLayout,
} from "./layout.types.js";

export interface FormatLayoutConfig {
  formatId: string;
  name: string;
  headerYCutoff: number;
  footerYCutoff: number;
  rowYTolerance: number;
  columnBands: LayoutColumnBand[];
  detect: (tokens: PdfToken[]) => boolean;
}

export const JG_UNIV_SEM4_PROFILE: FormatLayoutConfig = {
  formatId: "jg_univ_sem4_tabular_v1",
  name: "JG University Semester 4 Result Sheet",
  headerYCutoff: 7.3,
  footerYCutoff: 50.0,
  rowYTolerance: 0.15,
  detect: (tokens: PdfToken[]) => {
    const has10DigitEnrollment = tokens.some(
      (t) => t.x >= 3.0 && t.x <= 6.0 && /^\d{10}$/.test(t.text),
    );
    const hasSemesterHeader = tokens.some((t) =>
      t.text.includes("SEMESTER"),
    );
    return has10DigitEnrollment && hasSemesterHeader;
  },
  columnBands: [
    { id: "sNo", minX: 3.0, maxX: 4.0, label: "S.No" },
    { id: "enrollment", minX: 4.0, maxX: 5.8, label: "Enrollment No." },
    { id: "rollNumber", minX: 5.8, maxX: 8.0, label: "Roll No." },
    // Subject 0 (Machine Learning)
    { id: "subject_0_internal", minX: 8.0, maxX: 9.5, label: "Sub 0 Internal" },
    { id: "subject_0_external", minX: 9.5, maxX: 10.5, label: "Sub 0 External" },
    { id: "subject_0_total", minX: 10.5, maxX: 11.8, label: "Sub 0 Total" },
    { id: "subject_0_grade", minX: 11.8, maxX: 12.8, label: "Sub 0 Grade" },
    { id: "subject_0_gradePoints", minX: 12.8, maxX: 14.0, label: "Sub 0 GP" },
    { id: "subject_0_credits", minX: 14.0, maxX: 15.0, label: "Sub 0 Credits" },
    { id: "subject_0_creditPoints", minX: 15.0, maxX: 16.5, label: "Sub 0 CP" },
    // Subject 1 (Computer Networks)
    { id: "subject_1_internal", minX: 16.5, maxX: 17.5, label: "Sub 1 Internal" },
    { id: "subject_1_external", minX: 17.5, maxX: 18.5, label: "Sub 1 External" },
    { id: "subject_1_total", minX: 18.5, maxX: 19.8, label: "Sub 1 Total" },
    { id: "subject_1_grade", minX: 19.8, maxX: 20.8, label: "Sub 1 Grade" },
    { id: "subject_1_gradePoints", minX: 20.8, maxX: 22.0, label: "Sub 1 GP" },
    { id: "subject_1_credits", minX: 22.0, maxX: 23.0, label: "Sub 1 Credits" },
    { id: "subject_1_creditPoints", minX: 23.0, maxX: 24.5, label: "Sub 1 CP" },
    // Subject 2 (Vector Calculus)
    { id: "subject_2_internal", minX: 24.5, maxX: 25.5, label: "Sub 2 Internal" },
    { id: "subject_2_external", minX: 25.5, maxX: 26.5, label: "Sub 2 External" },
    { id: "subject_2_total", minX: 26.5, maxX: 27.8, label: "Sub 2 Total" },
    { id: "subject_2_grade", minX: 27.8, maxX: 28.8, label: "Sub 2 Grade" },
    { id: "subject_2_gradePoints", minX: 28.8, maxX: 30.0, label: "Sub 2 GP" },
    { id: "subject_2_credits", minX: 30.0, maxX: 31.0, label: "Sub 2 Credits" },
    { id: "subject_2_creditPoints", minX: 31.0, maxX: 32.5, label: "Sub 2 CP" },
    // Subject 3 (Software Engineering)
    { id: "subject_3_internal", minX: 32.5, maxX: 33.5, label: "Sub 3 Internal" },
    { id: "subject_3_external", minX: 33.5, maxX: 34.5, label: "Sub 3 External" },
    { id: "subject_3_total", minX: 34.5, maxX: 35.8, label: "Sub 3 Total" },
    { id: "subject_3_grade", minX: 35.8, maxX: 36.8, label: "Sub 3 Grade" },
    { id: "subject_3_gradePoints", minX: 36.8, maxX: 38.0, label: "Sub 3 GP" },
    { id: "subject_3_credits", minX: 38.0, maxX: 39.0, label: "Sub 3 Credits" },
    { id: "subject_3_creditPoints", minX: 39.0, maxX: 40.5, label: "Sub 3 CP" },
    // Subject 4 (UI/UX)
    { id: "subject_4_internal", minX: 40.5, maxX: 41.5, label: "Sub 4 Internal" },
    { id: "subject_4_external", minX: 41.5, maxX: 42.5, label: "Sub 4 External" },
    { id: "subject_4_total", minX: 42.5, maxX: 43.8, label: "Sub 4 Total" },
    { id: "subject_4_grade", minX: 43.8, maxX: 44.8, label: "Sub 4 Grade" },
    { id: "subject_4_gradePoints", minX: 44.8, maxX: 46.0, label: "Sub 4 GP" },
    { id: "subject_4_credits", minX: 46.0, maxX: 47.0, label: "Sub 4 Credits" },
    { id: "subject_4_creditPoints", minX: 47.0, maxX: 48.5, label: "Sub 4 CP" },
    // Subject 5 (Entrepreneurship)
    { id: "subject_5_internal", minX: 48.5, maxX: 49.5, label: "Sub 5 Internal" },
    { id: "subject_5_external", minX: 49.5, maxX: 50.5, label: "Sub 5 External" },
    { id: "subject_5_total", minX: 50.5, maxX: 51.8, label: "Sub 5 Total" },
    { id: "subject_5_grade", minX: 51.8, maxX: 52.8, label: "Sub 5 Grade" },
    { id: "subject_5_gradePoints", minX: 52.8, maxX: 54.0, label: "Sub 5 GP" },
    { id: "subject_5_credits", minX: 54.0, maxX: 55.0, label: "Sub 5 Credits" },
    { id: "subject_5_creditPoints", minX: 55.0, maxX: 56.5, label: "Sub 5 CP" },
    // Subject 6 (Sustainable Energy)
    { id: "subject_6_internal", minX: 56.5, maxX: 57.5, label: "Sub 6 Internal" },
    { id: "subject_6_external", minX: 57.5, maxX: 58.5, label: "Sub 6 External" },
    { id: "subject_6_total", minX: 58.5, maxX: 59.8, label: "Sub 6 Total" },
    { id: "subject_6_grade", minX: 59.8, maxX: 60.8, label: "Sub 6 Grade" },
    { id: "subject_6_gradePoints", minX: 60.8, maxX: 62.0, label: "Sub 6 GP" },
    { id: "subject_6_credits", minX: 62.0, maxX: 63.0, label: "Sub 6 Credits" },
    { id: "subject_6_creditPoints", minX: 63.0, maxX: 64.0, label: "Sub 6 CP" },
    // Summary Columns
    { id: "marksMax", minX: 64.0, maxX: 65.2, label: "Marks Max" },
    { id: "marksObtain", minX: 65.2, maxX: 66.4, label: "Marks Obtain" },
    { id: "totalCredits", minX: 66.4, maxX: 67.5, label: "Total Credits" },
    { id: "totalGradePoints", minX: 67.5, maxX: 68.6, label: "Total GP" },
    { id: "sgpa", minX: 68.6, maxX: 69.8, label: "SGPA" },
    { id: "totalCP", minX: 69.8, maxX: 72.0, label: "Total CP" },
  ],
};

export class FormatDetector {
  private profiles: FormatLayoutConfig[] = [JG_UNIV_SEM4_PROFILE];

  detectFormat(tokens: PdfToken[]): FormatLayoutConfig {
    for (const profile of this.profiles) {
      if (profile.detect(tokens)) {
        return profile;
      }
    }
    return JG_UNIV_SEM4_PROFILE;
  }
}

export class LayoutAnalyzer {
  private formatDetector = new FormatDetector();

  analyze(tokens: PdfToken[]): DocumentLayout {
    const config = this.formatDetector.detectFormat(tokens);

    // Group tokens by page
    const pageMap = new Map<number, PdfToken[]>();
    for (const token of tokens) {
      const pageTokens = pageMap.get(token.page) ?? [];
      pageTokens.push(token);
      pageMap.set(token.page, pageTokens);
    }

    const pageNumbers = Array.from(pageMap.keys()).sort((a, b) => a - b);
    const pages: PageLayout[] = [];
    let totalDataRows = 0;

    for (const pageNumber of pageNumbers) {
      const pageTokens = pageMap.get(pageNumber) ?? [];
      const headerTokens: PdfToken[] = [];
      const footerTokens: PdfToken[] = [];
      const dataTokens: PdfToken[] = [];

      for (const token of pageTokens) {
        if (token.y < config.headerYCutoff) {
          headerTokens.push(token);
        } else if (token.y > config.footerYCutoff) {
          footerTokens.push(token);
        } else {
          dataTokens.push(token);
        }
      }

      const dataRows: LayoutRow[] = [];

      for (const token of dataTokens) {
        let matchingRow = dataRows.find(
          (row) => Math.abs(row.y - token.y) <= config.rowYTolerance,
        );

        if (!matchingRow) {
          matchingRow = {
            page: pageNumber,
            y: token.y,
            tokens: [],
            cellsByColumn: {},
          };
          dataRows.push(matchingRow);
        }

        matchingRow.tokens.push(token);

        for (const band of config.columnBands) {
          if (token.x >= band.minX && token.x < band.maxX) {
            const cellTokens = matchingRow.cellsByColumn[band.id] ?? [];
            cellTokens.push(token);
            matchingRow.cellsByColumn[band.id] = cellTokens;
            break;
          }
        }
      }

      totalDataRows += dataRows.length;

      pages.push({
        pageNumber,
        headerTokens,
        dataRows,
        footerTokens,
      });
    }

    return {
      formatId: config.formatId,
      pageCount: pages.length,
      pages,
      columnBands: config.columnBands,
      totalDataRows,
    };
  }
}
