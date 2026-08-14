import { SubjectParser } from "./subject.parser.js";
import { StudentResult } from "../types/student.types.js";
import { DocumentLayout, LayoutRow } from "./layout.types.js";

export class StudentParser {
  private subjectParser = new SubjectParser();

  /**
   * Splits the entire PDF word array into one array per student.
   */
  splitStudents(words: string[]): string[][] {
    const students: string[][] = [];

    let currentStudent: string[] = [];
    let started = false;

    for (const word of words) {
      // Detect first enrollment number
      if (/^250\d{7}$/.test(word)) {
        started = true;

        if (currentStudent.length > 0) {
          students.push(currentStudent);
        }

        currentStudent = [];
      }

      // Ignore everything before first student
      if (!started) {
        continue;
      }

      currentStudent.push(word);
    }

    if (currentStudent.length > 0) {
      students.push(currentStudent);
    }

    return students;
  }

  /**
   * Parses a single student's data.
   */
  parse(words: string[]): StudentResult {
    const enrollment = words[0];
    const rollNumber = words[1];

    if (words.includes("With-held")) {
      return {
        enrollment,
        rollNumber,

        subjects: [],

        totalCredits: 0,
        totalGradePoints: 0,
        sgpa: 0,
      };
    }

    const subjects = this.subjectParser.parse(words);

    let totalCredits = 0;
    let totalGradePoints = 0;

    for (const subject of subjects) {
      totalCredits += subject.credits;
      totalGradePoints += subject.gradePoints * subject.credits;
    }

    const sgpa =
      totalCredits === 0
        ? 0
        : Number((totalGradePoints / totalCredits).toFixed(2));

    return {
      enrollment,
      rollNumber,
      subjects,
      totalCredits,
      totalGradePoints,
      sgpa,
    };
  }

  /**
   * Layout-aware student parser consuming DocumentLayout from Phase 2
   */
  parseLayout(layout: DocumentLayout): StudentResult[] {
    const results: StudentResult[] = [];
    const allRows: LayoutRow[] = layout.pages.flatMap((p) => p.dataRows);

    for (const row of allRows) {
      const enrollmentTokens = row.cellsByColumn["enrollment"] ?? [];
      const enrollmentToken = enrollmentTokens.find((t) =>
        /^\d{10}$/.test(t.text),
      );

      if (!enrollmentToken) {
        continue;
      }

      const enrollment = enrollmentToken.text;

      const rollTokens = row.cellsByColumn["rollNumber"] ?? [];
      const rollNumber = rollTokens
        .filter((t) => !t.text.includes("With-held"))
        .map((t) => t.text)
        .join("")
        .trim();

      const isWithheld = row.tokens.some((t) => t.text.includes("With-held"));

      if (isWithheld) {
        results.push({
          enrollment,
          rollNumber,
          subjects: [],
          totalCredits: 0,
          totalGradePoints: 0,
          sgpa: 0,
        });
        continue;
      }

      const subjects = this.subjectParser.parseLayoutRow(row);

      let totalCredits = 0;
      let totalGradePoints = 0;

      for (const subject of subjects) {
        totalCredits += subject.credits;
        totalGradePoints += subject.gradePoints * subject.credits;
      }

      const sgpa =
        totalCredits === 0
          ? 0
          : Number((totalGradePoints / totalCredits).toFixed(2));

      results.push({
        enrollment,
        rollNumber,
        subjects,
        totalCredits,
        totalGradePoints,
        sgpa,
      });
    }

    return results;
  }
}
