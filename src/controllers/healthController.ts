import { Request, Response } from "express";
import { sendSuccess } from "../utils/responseFormatter";

export const getHealth = (req: Request, res: Response) => {
  const data = {
    status: "UP",
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  };
  sendSuccess(res, data, "System is healthy");
};
