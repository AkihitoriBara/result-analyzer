import { SubjectParser } from "./subject.parser.js";
import { StudentResult } from "../types/student.types.js";

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
}
