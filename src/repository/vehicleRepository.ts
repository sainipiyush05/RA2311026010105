import axios from "axios";
import { IVehicle } from "../interfaces/vehicle.interface";
import { ENV } from "../config/env";
import { withRetry } from "../utils/retryHandler";
import { Log } from "../middleware/logger";

export const getVehicles = async (): Promise<IVehicle[]> => {
  await Log("backend", "debug", "repository", "Fetching vehicles from external API");
  
  const fetchFn = async () => {
    const response = await axios.get(ENV.VEHICLES_API, {
      headers: { Authorization: `Bearer ${ENV.TOKEN}` },
      timeout: 5000
    });
    return response.data;
  };

  const data = await withRetry(fetchFn, 3, 1000, "fetchVehicles");
  return data;
};
