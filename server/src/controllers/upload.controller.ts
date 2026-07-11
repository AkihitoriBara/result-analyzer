import { Request, Response } from "express";
import { UploadService } from "../services/upload.service.js";

export class UploadController {
  private uploadService = new UploadService();

  async upload(req: Request, res: Response) {
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded.",
      });
    }

    try {
      const result = await this.uploadService.uploadFile(file);

      return res.status(200).json(result);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "The PDF could not be processed.";

      return res.status(500).json({
        success: false,
        message,
      });
    }
  }

  async getAllUploads(req: Request, res: Response) {
    const uploads = await this.uploadService.getAllUploads();

    return res.json({
      success: true,
      count: uploads.length,
      uploads,
    });
  }

  async deleteUpload(req: Request, res: Response) {
    const uploadId = Number(req.params.id);

    if (Number.isNaN(uploadId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid upload id.",
      });
    }

    try {
      const result = await this.uploadService.deleteUpload(uploadId);

      return res.json(result);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to delete upload.";

      const statusCode = message === "Upload not found." ? 404 : 500;

      return res.status(statusCode).json({
        success: false,
        message,
      });
    }
  }
}
