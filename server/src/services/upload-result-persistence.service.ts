import prisma from "../database/prisma.js";
import { StudentResult } from "../types/student.types.js";
import { StudentRepository } from "../database/repositories/student.repository.js";
import { ResultRepository } from "../database/repositories/result.repository.js";
import { SubjectRepository } from "../database/repositories/subject.repository.js";
import { AppError } from "../errors/app-error.js";

type UploadCriteria = {
  minimumInternal: number;
  minimumExternal: number;
  minimumTotal: number | null;
};

type UploadRecord = {
  id: number;
};

export class UploadResultPersistenceService {
  private studentRepository = new StudentRepository();
  private resultRepository = new ResultRepository();
  private subjectRepository = new SubjectRepository();

  async persistStudents(
    students: StudentResult[],
    criteria: UploadCriteria,
    upload: UploadRecord,
  ) {
    return await prisma.$transaction(
      async (tx) => {
        const enrollments = students.map((s) => s.enrollment);

        // 1. Fetch all existing students by their enrollments in a single query
        const existingStudents = await this.studentRepository.getStudentsByEnrollments(
          enrollments,
          tx,
        );

        const existingMap = new Map(
          existingStudents.map((s) => [s.enrollment, s]),
        );

        // 2. Identify new students and update existing students if roll numbers changed
        const studentsToCreate: Array<{ enrollment: string; rollNumber: string }> = [];

        for (const student of students) {
          const existing = existingMap.get(student.enrollment);
          if (!existing) {
            studentsToCreate.push({
              enrollment: student.enrollment,
              rollNumber: student.rollNumber,
            });
          } else if (existing.rollNumber !== student.rollNumber) {
            // Update individual student roll number if it changed (rare)
            await this.studentRepository.updateStudentRollNumber(
              student.enrollment,
              student.rollNumber,
              tx,
            );
          }
        }

        // 3. Bulk insert new students in one query
        if (studentsToCreate.length > 0) {
          await this.studentRepository.createStudents(studentsToCreate, tx);
        }

        // 4. Fetch all students again to resolve all database IDs (both existing and new ones)
        const allDbStudents = await this.studentRepository.getStudentsByEnrollments(
          enrollments,
          tx,
        );

        const dbStudentMap = new Map(
          allDbStudents.map((s) => [s.enrollment, s]),
        );

        // 5. Prepare and bulk insert results using createManyAndReturn
        const resultsToCreate = students.map((student) => {
          const dbStudent = dbStudentMap.get(student.enrollment);
          if (!dbStudent) {
            throw new Error(`Failed to resolve student ID for enrollment: ${student.enrollment}`);
          }

          const passed =
            student.subjects.length > 0 &&
            student.subjects.every(
              (subject) =>
                subject.internal >= criteria.minimumInternal &&
                subject.external >= criteria.minimumExternal &&
                (criteria.minimumTotal == null ||
                  subject.total >= criteria.minimumTotal),
            );

          return {
            studentId: dbStudent.id,
            uploadId: upload.id,
            sgpa: student.sgpa,
            totalCredits: student.totalCredits,
            totalGradePoints: student.totalGradePoints,
            passed,
          };
        });

        const createdResults = await this.resultRepository.createResultsAndReturn(
          resultsToCreate,
          tx,
        );

        // Map from studentId to the newly created resultId
        const studentIdToResultIdMap = new Map<number, number>();
        for (const res of createdResults) {
          studentIdToResultIdMap.set(res.studentId, res.id);
        }

        // 6. Prepare and bulk insert all subject results in one query
        const subjectsToCreate: Array<{
          resultId: number;
          subjectCode: string;
          subjectName: string;
          internal: number;
          external: number;
          total: number;
          grade: string;
          credits: number;
          gradePoints: number;
        }> = [];

        for (const student of students) {
          const dbStudent = dbStudentMap.get(student.enrollment);
          if (!dbStudent) continue;

          const resultId = studentIdToResultIdMap.get(dbStudent.id);
          if (!resultId) {
            throw new AppError(
              `Failed to resolve student ID for ${student.enrollment}`,
              500
);
          }

          for (const subject of student.subjects) {
            subjectsToCreate.push({
              resultId,
              subjectCode: subject.subjectCode,
              subjectName: subject.subjectName,
              internal: subject.internal,
              external: subject.external,
              total: subject.total,
              grade: subject.grade,
              credits: subject.credits,
              gradePoints: subject.gradePoints,
            });
          }
        }

        if (subjectsToCreate.length > 0) {
          await this.subjectRepository.createSubjects(subjectsToCreate, tx);
        }
      },
      {
        maxWait: 15000,
        timeout: 90000,
      },
    );
  }
}
