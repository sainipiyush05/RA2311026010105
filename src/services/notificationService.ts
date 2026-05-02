import { getNotifications } from "../repository/notificationRepository";
import { getTopKNotifications } from "../algorithms/priorityQueue";
import { Log } from "../middleware/logger";

export const getPriorityInbox = async () => {
  await Log("backend", "info", "service", "Generating priority inbox for top 10 notifications");

  const notifications = await getNotifications();
  
  // Requirement: Top 10 unread notifications
  // Using O(n log k) Min Heap algorithm
  const top10 = await getTopKNotifications(notifications, 10);

  return top10;
};
