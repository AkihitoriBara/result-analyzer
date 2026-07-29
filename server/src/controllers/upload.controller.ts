import { NextFunction, Request, Response } from "express";
import { UploadService } from "../services/upload.service.js";

export class UploadController {
  private uploadService = new UploadService();

  async upload(req: Request, res: Response, next: NextFunction) {
    const file = req.file;

    try {
      const result = await this.uploadService.uploadFile(file!);

      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async getAllUploads(req: Request, res: Response, next: NextFunction) {
    try {
      const uploads = await this.uploadService.getAllUploads();

      return res.json({
        success: true,
        count: uploads.length,
        uploads,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteUpload(req: Request, res: Response, next: NextFunction) {
    const uploadId = Number(req.params.id);

    try {
      const result = await this.uploadService.deleteUpload(uploadId);

      return res.json(result);
    } catch (error) {
      next(error);
    }
  }
}
