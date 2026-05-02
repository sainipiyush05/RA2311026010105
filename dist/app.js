"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
// Middleware
const requestIdMiddleware_1 = require("./middleware/requestIdMiddleware");
const requestLogger_1 = require("./middleware/requestLogger");
const performanceMiddleware_1 = require("./middleware/performanceMiddleware");
const notFoundMiddleware_1 = require("./middleware/notFoundMiddleware");
const errorMiddleware_1 = require("./middleware/errorMiddleware");
// Routes
const healthRoutes_1 = __importDefault(require("./routes/healthRoutes"));
const schedulerRoutes_1 = __importDefault(require("./routes/schedulerRoutes"));
const notificationRoutes_1 = __importDefault(require("./routes/notificationRoutes"));
const app = (0, express_1.default)();
// Security and utility middleware
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Trace and Performance
app.use(requestIdMiddleware_1.requestIdMiddleware);
app.use(performanceMiddleware_1.performanceMiddleware);
app.use(requestLogger_1.requestLogger);
// Morgan for local detailed logging
if (process.env.NODE_ENV !== "production") {
    app.use((0, morgan_1.default)("dev"));
}
// API Routes
app.use("/api/health", healthRoutes_1.default);
app.use("/api/schedule", schedulerRoutes_1.default);
app.use("/api/notifications", notificationRoutes_1.default);
// Catch all unmatched routes
app.use(notFoundMiddleware_1.notFoundHandler);
// Centralized error handling
app.use(errorMiddleware_1.errorHandler);
exports.default = app;
