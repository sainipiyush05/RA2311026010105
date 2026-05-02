import { Request, Response, NextFunction } from "express";
import { generateSchedule } from "../services/schedulerService";
import { sendSuccess, sendError } from "../utils/responseFormatter";
import { Log } from "../middleware/logger";

export const getSchedule = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { depotId } = req.params;
    await Log("backend", "info", "controller", `Processing schedule request for depot ${depotId}`);

    const schedule = await generateSchedule(depotId as string);

    sendSuccess(res, schedule, "Schedule generated successfully");
  } catch (error: any) {
    if (error.message.includes("not found")) {
      sendError(res, error.message, 404);
    } else {
      next(error); // Pass to centralized error handler
    }
  }
};
