import { SEM4_SUBJECTS } from "./parser.constants.js";
import { SubjectResult } from "../types/student.types.js";

export class SubjectParser {
  private toNumber(value: string): number {
    const num = Number(value);
    return Number.isNaN(num) ? 0 : num;
  }

  private isGrade(value: string): boolean {
    return ["O", "A+", "A", "B+", "B", "C", "D", "F"].includes(value);
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

      let grade = words[index++];
      let rawGradePoints: string;

      // Some PDFs omit the grade and put GP immediately after Total.
      if (this.isGrade(grade)) {
        rawGradePoints = words[index++];
      } else {
        rawGradePoints = grade;
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
}
