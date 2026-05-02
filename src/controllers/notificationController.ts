import { Request, Response, NextFunction } from "express";
import { getPriorityInbox } from "../services/notificationService";
import { sendSuccess } from "../utils/responseFormatter";
import { Log } from "../middleware/logger";

export const fetchPriorityInbox = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await Log("backend", "info", "controller", "Processing request for Priority Inbox");

    const priorityNotifications = await getPriorityInbox();

    sendSuccess(res, priorityNotifications, "Priority Inbox fetched successfully");
  } catch (error: any) {
    next(error);
  }
};
