import { SEM4_SUBJECTS } from "./parser.constants.js";
import { SubjectResult } from "../types/student.types.js";
import { LayoutRow } from "./layout.types.js";

export class SubjectParser {
  private toNumber(value: string): number {
    const num = Number(value);
    return Number.isNaN(num) ? 0 : num;
  }

  private isGrade(value: string): boolean {
    return ["O", "A+", "A", "B+", "B", "C", "D", "F"].includes(value.trim());
  }

  private calculateGrade(total: number): string {
    if (total >= 100) return "O";
    if (total >= 90) return "A+";
    if (total >= 80) return "A";
    if (total >= 70) return "B+";
    if (total >= 60) return "B";
    if (total >= 50) return "C";
    if (total >= 40) return "D";
    return "F";
  }

  parse(words: string[]): SubjectResult[] {
    const subjects: SubjectResult[] = [];

    // Skip Enrollment + Roll Number
    let index = 2;

    for (const subject of SEM4_SUBJECTS) {
      const internal = this.toNumber(words[index++]);
      const external = this.toNumber(words[index++]);
      const total = this.toNumber(words[index++]);

      let grade = words[index++].trim();
      let rawGradePoints: string;

      // Read the grade if present.
      // If the grade is missing, calculate it from the total marks.
      if (this.isGrade(grade)) {
        rawGradePoints = words[index++].trim();
      } else {
        rawGradePoints = grade.trim();
        grade = this.calculateGrade(total);
      }

      const gradePoints =
        rawGradePoints === "-" ? 0 : this.toNumber(rawGradePoints);

      // Skip Credit column
      index++;

      subjects.push({
        subjectCode: subject.code,
        subjectName: subject.name,

        internal,
        external,
        total,

        grade,

        credits: subject.credits,
        gradePoints,
      });
    }

    return subjects;
  }

  /**
   * Layout-aware subject parser consuming LayoutRow.cellsByColumn
   */
  parseLayoutRow(row: LayoutRow): SubjectResult[] {
    const subjects: SubjectResult[] = [];

    for (let i = 0; i < SEM4_SUBJECTS.length; i++) {
      const subject = SEM4_SUBJECTS[i];
      const prefix = `subject_${i}_`;

      const intTokens = row.cellsByColumn[`${prefix}internal`] ?? [];
      const extTokens = row.cellsByColumn[`${prefix}external`] ?? [];
      const totTokens = row.cellsByColumn[`${prefix}total`] ?? [];
      const grTokens = row.cellsByColumn[`${prefix}grade`] ?? [];
      const gpTokens = row.cellsByColumn[`${prefix}gradePoints`] ?? [];

      const intStr = intTokens.map((t) => t.text).join("").trim();
      const extStr = extTokens.map((t) => t.text).join("").trim();
      const totStr = totTokens.map((t) => t.text).join("").trim();
      const grStr = grTokens.map((t) => t.text).join("").trim();
      const gpStr = gpTokens.map((t) => t.text).join("").trim();

      const internal = this.toNumber(intStr);
      const external = this.toNumber(extStr);
      const total = this.toNumber(totStr);

      let grade = grStr;
      let rawGradePoints: string;

      if (this.isGrade(grade)) {
        rawGradePoints = gpStr;
      } else {
        rawGradePoints = grade || gpStr;
        grade = this.calculateGrade(total);
      }

      const gradePoints =
        rawGradePoints === "-" ? 0 : this.toNumber(rawGradePoints);

      subjects.push({
        subjectCode: subject.code,
        subjectName: subject.name,

        internal,
        external,
        total,

        grade,

        credits: subject.credits,
        gradePoints,
      });
    }

    return subjects;
  }
}
