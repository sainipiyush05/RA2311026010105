import { Request, Response, NextFunction } from "express";
import { Log } from "./logger";

export const validateRequest = (schema: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (schema && typeof schema.validate === 'function') {
        const { error } = schema.validate(req.body);
        if (error) {
          await Log("backend", "warn", "middleware", `Validation failed: ${error.message}`);
          res.status(400).json({ error: error.message });
          return;
        }
      }
      next();
    } catch (err: any) {
      await Log("backend", "error", "middleware", `Validation error: ${err.message}`);
      res.status(400).json({ error: err.message });
    }
  };
};
