import { Request, Response, NextFunction } from "express";
import { Log } from "./logger";

export const performanceMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();

  res.on("finish", async () => {
    const duration = Date.now() - start;
    if (duration > 1000) {
      // Log slow queries/requests
      await Log("backend", "warn", "middleware", `Slow API Response: ${req.method} ${req.originalUrl} took ${duration}ms`);
    } else {
      await Log("backend", "debug", "middleware", `Performance: ${req.method} ${req.originalUrl} took ${duration}ms`);
    }
  });

  next();
};
