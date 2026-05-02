import { INotification } from "../interfaces/notification.interface";
import { MinHeap } from "./minHeap";
import { Log } from "../middleware/logger";

const PRIORITY_MAP: Record<string, number> = {
  "Placement": 3,
  "Result": 2,
  "Event": 1
};

/**
 * Comparator function.
 * Since we want a Min Heap to keep the TOP K highest-priority items, 
 * the root should be the MINIMUM (lowest priority) of the top K items.
 * A < 0 means A is smaller (lower priority).
 */
const notificationComparator = (a: INotification, b: INotification): number => {
  const priorityA = PRIORITY_MAP[a.Type] || 0;
  const priorityB = PRIORITY_MAP[b.Type] || 0;

  if (priorityA !== priorityB) {
    return priorityA - priorityB;
  }

  // Fallback to timestamp (newer is higher priority)
  const timeA = new Date(a.Timestamp).getTime();
  const timeB = new Date(b.Timestamp).getTime();
  return timeA - timeB;
};

export const getTopKNotifications = async (notifications: INotification[], k: number): Promise<INotification[]> => {
  await Log("backend", "debug", "utils", `Running MinHeap algorithm to find top ${k} of ${notifications.length} notifications`);
  
  const minHeap = new MinHeap<INotification>(notificationComparator);

  for (const notification of notifications) {
    minHeap.push(notification);

    if (minHeap.size() > k) {
      minHeap.pop(); // Remove the lowest priority item
    }
  }

  // The heap contains the top K elements, but in no particular sorted order (except root is smallest).
  // We pop them out to get them sorted ascending, then reverse to get descending (highest priority first).
  const topK: INotification[] = [];
  while (minHeap.size() > 0) {
    topK.push(minHeap.pop()!);
  }

  return topK.reverse();
};
