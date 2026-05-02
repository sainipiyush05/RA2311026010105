import { Log } from "../middleware/logger";

export const withRetry = async <T>(
  operation: () => Promise<T>,
  retries = 3,
  delay = 1000,
  context = "operation"
): Promise<T> => {
  for (let i = 0; i < retries; i++) {
    try {
      return await operation();
    } catch (error: any) {
      if (i === retries - 1) {
        await Log("backend", "error", "utils", `All ${retries} retries failed for ${context}: ${error.message}`);
        throw error;
      }
      await Log("backend", "warn", "utils", `Retry ${i + 1}/${retries} for ${context} failed. Retrying in ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  throw new Error("Retry failed");
};
