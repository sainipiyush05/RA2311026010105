import { Request, Response, NextFunction } from "express";
import { Log } from "./logger";

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    await Log("backend", "warn", "auth", "Unauthorized access attempt");
    res.status(401).json({ message: "Unauthorized - Bearer token missing" });
    return;
  }
  next();
};
