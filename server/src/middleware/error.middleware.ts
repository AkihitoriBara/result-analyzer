import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/app-error.js";

export function errorMiddleware(
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (error instanceof AppError) {
    const responseBody = {
      success: false,
      message: error.message,
      statusCode: error.statusCode,
    };

    if (process.env.NODE_ENV !== "production") {
      return res.status(error.statusCode).json({
        ...responseBody,
        stack: error.stack,
      });
    }

    return res.status(error.statusCode).json(responseBody);
  }

  if (error instanceof Error) {
    console.error("Unhandled error:", error);

    const responseBody = {
      success: false,
      message: "Internal Server Error",
      statusCode: 500,
    };

    if (process.env.NODE_ENV !== "production") {
      return res.status(500).json({
        ...responseBody,
        stack: error.stack,
      });
    }

    return res.status(500).json(responseBody);
  }

  console.error("Unhandled error:", error);

  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
    statusCode: 500,
  });
}
