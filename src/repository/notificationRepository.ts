import axios from "axios";
import { INotification } from "../interfaces/notification.interface";
import { ENV } from "../config/env";
import { withRetry } from "../utils/retryHandler";
import { Log } from "../middleware/logger";

export const getNotifications = async (): Promise<INotification[]> => {
  await Log("backend", "debug", "repository", "Fetching notifications from external API");
  
  const fetchFn = async () => {
    const response = await axios.get(ENV.NOTIFICATIONS_API, {
      headers: { Authorization: `Bearer ${ENV.TOKEN}` },
      timeout: 5000
    });
    return response.data.notifications;
  };

  const data = await withRetry(fetchFn, 3, 1000, "fetchNotifications");
  return data;
};
