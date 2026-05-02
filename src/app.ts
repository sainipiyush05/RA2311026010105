import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

// Middleware
import { requestIdMiddleware } from "./middleware/requestIdMiddleware";
import { requestLogger } from "./middleware/requestLogger";
import { performanceMiddleware } from "./middleware/performanceMiddleware";
import { notFoundHandler } from "./middleware/notFoundMiddleware";
import { errorHandler } from "./middleware/errorMiddleware";

// Routes
import healthRoutes from "./routes/healthRoutes";
import schedulerRoutes from "./routes/schedulerRoutes";
import notificationRoutes from "./routes/notificationRoutes";

const app = express();

// Security and utility middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Trace and Performance
app.use(requestIdMiddleware);
app.use(performanceMiddleware);
app.use(requestLogger);

// Morgan for local detailed logging
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// API Routes
app.use("/api/health", healthRoutes);
app.use("/api/schedule", schedulerRoutes);
app.use("/api/notifications", notificationRoutes);

// Catch all unmatched routes
app.use(notFoundHandler);

// Centralized error handling
app.use(errorHandler);

export default app;