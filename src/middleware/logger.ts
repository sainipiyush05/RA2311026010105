import axios from "axios";
import { ENV } from "../config/env";
import { StackType } from "../types/stackTypes";
import { LevelType } from "../types/logLevels";
import { PackageType } from "../types/packageTypes";

// Simple retry logic helper
const retryRequest = async (fn: () => Promise<any>, retries = 3, delay = 1000) => {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise(res => setTimeout(res, delay));
    }
  }
};

export const Log = async (
  stack: StackType,
  level: LevelType,
  packageName: PackageType,
  message: string
) => {
  try {
    if (!ENV.TOKEN) {
      console.warn("Log function called but no TOKEN is set.");
      return;
    }

    const payload = { stack, level, package: packageName, message };

    const apiCall = () =>
      axios.post(ENV.LOGGING_API, payload, {
        headers: {
          Authorization: `Bearer ${ENV.TOKEN}`,
          "Content-Type": "application/json",
        },
        timeout: 5000,
      });

    const response = await retryRequest(apiCall, 3, 500);

    // Logging to console in development
    if (process.env.NODE_ENV !== "production") {
      console.log(`[Remote Log Success] [${level.toUpperCase()}] [${packageName}] ${message}`);
    }
  } catch (error: any) {
    if (error.message.includes("timeout") || error.code === "ECONNREFUSED" || error.code === "ECONNRESET") {
      // Suppress the giant error stack for network issues so your terminal stays clean
      console.log(`[Remote Log Offline] The external evaluation API is currently unreachable. Continuing normally...`);
    } else {
      console.error(
        `[Remote Log Failed] [${level.toUpperCase()}] [${packageName}] ${message} - Error:`,
        error.response?.data || error.message
      );
    }
  }
};
