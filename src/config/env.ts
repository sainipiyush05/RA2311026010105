import dotenv from "dotenv";

dotenv.config();

export const ENV = {
  PORT: process.env.PORT || 3000,
  TOKEN: process.env.TOKEN || "",
  LOGGING_API: process.env.LOGGING_API || "http://20.244.56.144/evaluation-service/logs",
  DEPOTS_API: process.env.DEPOTS_API || "http://20.244.56.144/evaluation-service/depots",
  VEHICLES_API: process.env.VEHICLES_API || "http://20.244.56.144/evaluation-service/vehicles",
  NOTIFICATIONS_API: process.env.NOTIFICATIONS_API || "http://20.244.56.144/evaluation-service/notifications",
};
