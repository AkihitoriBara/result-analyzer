export class UploadService {
  uploadFile(file: Express.Multer.File) {
    return {
      success: true,
      message: "File uploaded successfully.",
      filename: file.filename,
      originalName: file.originalname,
      size: file.size,
      mimeType: file.mimetype,
    };
  }
}
