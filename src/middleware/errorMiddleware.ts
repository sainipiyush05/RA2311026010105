import { Request, Response, NextFunction } from "express";
import { Log } from "./logger";

interface ErrorResponse {
  message: string;
  stack?: string;
  errors?: any;
}

export const errorHandler = async (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  const message = err.message || "Internal Server Error";

  await Log("backend", "error", "middleware", `Error caught in middleware: ${message}`);

  const response: ErrorResponse = {
    message,
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
  };

  res.status(statusCode).json(response);
};
