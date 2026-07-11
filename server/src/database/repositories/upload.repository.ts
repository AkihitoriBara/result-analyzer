import prisma from "../prisma.js";

export class UploadRepository {
  async createUpload(data: {
    fileName: string;
    originalFileName: string;
    semester: number;
    academicYear: string;
    criteriaId: number;
  }) {
    return prisma.upload.create({
      data,
    });
  }

  async getAllUploads() {
    return prisma.upload.findMany({
      orderBy: {
        uploadedAt: "desc",
      },
    });
  }

  async deleteUpload(uploadId: number) {
    const upload = await prisma.upload.findUnique({
      where: {
        id: uploadId,
      },
      include: {
        results: {
          select: {
            id: true,
            studentId: true,
          },
        },
      },
    });

    if (!upload) {
      return null;
    }

    const resultIds = upload.results.map((result) => result.id);
    const studentIds = [...new Set(upload.results.map((result) => result.studentId))];

    const deleted = await prisma.$transaction(async (tx) => {
      await tx.subjectResult.deleteMany({
        where: {
          resultId: {
            in: resultIds,
          },
        },
      });

      await tx.result.deleteMany({
        where: {
          uploadId,
        },
      });

      await tx.upload.delete({
        where: {
          id: uploadId,
        },
      });

      const deletedStudents = await tx.student.deleteMany({
        where: {
          id: {
            in: studentIds,
          },
          results: {
            none: {},
          },
        },
      });

      await tx.passCriteria.deleteMany({
        where: {
          id: upload.criteriaId,
          uploads: {
            none: {},
          },
        },
      });

      return {
        uploadId,
        fileName: upload.fileName,
        deletedResults: resultIds.length,
        deletedStudents: deletedStudents.count,
      };
    });

    return deleted;
  }
}
