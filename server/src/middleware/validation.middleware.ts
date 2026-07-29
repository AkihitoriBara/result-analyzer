import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/app-error.js";

export function validateEnrollmentQuery(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const enrollment = req.query.enrollment;

  if (typeof enrollment !== "string" || enrollment.trim() === "") {
    return next(new AppError("Enrollment number is required.", 400));
  }

  req.query.enrollment = enrollment.trim();

  return next();
}

export function validateUploadId(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const uploadId = Number(req.params.id);

  if (!req.params.id || Number.isNaN(uploadId)) {
    return next(new AppError("Invalid upload id.", 400));
  }

  return next();
}

export function validateUploadFile(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (!req.file) {
    return next(new AppError("No file uploaded.", 400));
  }

  return next();
}
