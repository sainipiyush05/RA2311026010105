"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTopKNotifications = void 0;
const minHeap_1 = require("./minHeap");
const logger_1 = require("../middleware/logger");
const PRIORITY_MAP = {
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
const notificationComparator = (a, b) => {
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
const getTopKNotifications = (notifications, k) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, logger_1.Log)("backend", "debug", "utils", `Running MinHeap algorithm to find top ${k} of ${notifications.length} notifications`);
    const minHeap = new minHeap_1.MinHeap(notificationComparator);
    for (const notification of notifications) {
        minHeap.push(notification);
        if (minHeap.size() > k) {
            minHeap.pop(); // Remove the lowest priority item
        }
    }
    // The heap contains the top K elements, but in no particular sorted order (except root is smallest).
    // We pop them out to get them sorted ascending, then reverse to get descending (highest priority first).
    const topK = [];
    while (minHeap.size() > 0) {
        topK.push(minHeap.pop());
    }
    return topK.reverse();
});
exports.getTopKNotifications = getTopKNotifications;
