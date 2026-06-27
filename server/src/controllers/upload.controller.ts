import { Request, Response } from "express";
import { UploadService } from "../services/upload.service.js";

const uploadService = new UploadService();

export class UploadController {
  upload(req: Request, res: Response) {
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded.",
      });
    }

    const result = uploadService.uploadFile(file);

    return res.status(200).json(result);
  }
}
