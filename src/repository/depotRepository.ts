import axios from "axios";
import { IDepot } from "../interfaces/depot.interface";
import { ENV } from "../config/env";
import { withRetry } from "../utils/retryHandler";
import { Log } from "../middleware/logger";

export const getDepots = async (): Promise<IDepot[]> => {
  await Log("backend", "debug", "repository", "Fetching depots from external API");
  
  const fetchFn = async () => {
    const response = await axios.get(ENV.DEPOTS_API, {
      headers: { Authorization: `Bearer ${ENV.TOKEN}` },
      timeout: 5000
    });
    return response.data.depots;
  };

  const data = await withRetry(fetchFn, 3, 1000, "fetchDepots");
  return data;
};
