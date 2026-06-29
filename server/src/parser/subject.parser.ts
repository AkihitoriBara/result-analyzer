import { SEM4_SUBJECTS } from "./parser.constants.js";
import { SubjectResult } from "../types/student.types.js";

export class SubjectParser {
  parse(words: string[]): SubjectResult[] {
    const subjects: SubjectResult[] = [];

    let index = 2;

    for (const subject of SEM4_SUBJECTS) {
      const internal = Number(words[index++]);
      const external = Number(words[index++]);
      const total = Number(words[index++]);
      const grade = words[index++];
      const gradePoints = Number(words[index++]);

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

      // Skip CP column
      index++;
    }

    return subjects;
  }
}
