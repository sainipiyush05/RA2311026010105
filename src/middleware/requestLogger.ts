import { Request, Response, NextFunction } from "express";
import { Log } from "./logger";

export const requestLogger = async (req: Request, res: Response, next: NextFunction) => {
  const requestId = req.headers["x-request-id"];
  
  // We don't await this so it doesn't block the request lifecycle
  Log("backend", "info", "route", `[${requestId}] Incoming Request: ${req.method} ${req.originalUrl}`);
  
  next();
};
