import app from "./app";
import { ENV } from "./config/env";
import { Log } from "./middleware/logger";

const startServer = async () => {
  try {
    app.listen(ENV.PORT, async () => {
      console.log(`🚀 Server running on port ${ENV.PORT}`);
      await Log("backend", "info", "config", `Server successfully started on port ${ENV.PORT}`);
    });

    // Handle Uncaught Exceptions
    process.on("uncaughtException", async (error) => {
      console.error("Uncaught Exception:", error);
      await Log("backend", "fatal", "config", `Uncaught Exception: ${error.message}`);
      process.exit(1);
    });

    // Handle Unhandled Promise Rejections
    process.on("unhandledRejection", async (reason: any) => {
      console.error("Unhandled Rejection:", reason);
      await Log("backend", "fatal", "config", `Unhandled Rejection: ${reason.message || reason}`);
      process.exit(1);
    });

  } catch (error: any) {
    console.error("Failed to start server", error);
    process.exit(1);
  }
};

startServer();