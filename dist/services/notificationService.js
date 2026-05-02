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
exports.getPriorityInbox = void 0;
const notificationRepository_1 = require("../repository/notificationRepository");
const priorityQueue_1 = require("../algorithms/priorityQueue");
const logger_1 = require("../middleware/logger");
const getPriorityInbox = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, logger_1.Log)("backend", "info", "service", "Generating priority inbox for top 10 notifications");
    const notifications = yield (0, notificationRepository_1.getNotifications)();
    // Requirement: Top 10 unread notifications
    // Using O(n log k) Min Heap algorithm
    const top10 = yield (0, priorityQueue_1.getTopKNotifications)(notifications, 10);
    return top10;
});
exports.getPriorityInbox = getPriorityInbox;
