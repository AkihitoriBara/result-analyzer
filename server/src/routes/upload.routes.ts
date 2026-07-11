import { Router } from "express";
import { UploadController } from "../controllers/upload.controller.js";
import { upload } from "../middleware/upload.middleware.js";

const router = Router();

const uploadController = new UploadController();

router.get("/uploads", (req, res) => uploadController.getAllUploads(req, res));

router.delete("/uploads/:id", (req, res) =>
  uploadController.deleteUpload(req, res),
);

router.post(
  "/upload",
  upload.single("resultPdf"),
  uploadController.upload.bind(uploadController),
);

export default router;
