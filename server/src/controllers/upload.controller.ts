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

    const result = await this.uploadService.uploadFile(file);

    return res.status(200).json(result);
  }

  async getAllUploads(req: Request, res: Response) {
    const uploads = await this.uploadService.getAllUploads();

    return res.json({
      success: true,
      count: uploads.length,
      uploads,
    });
  }
}
