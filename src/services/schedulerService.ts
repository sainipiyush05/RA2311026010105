import { getDepots } from "../repository/depotRepository";
import { getVehicles } from "../repository/vehicleRepository";
import { optimizeSchedule } from "../algorithms/knapsack";
import { Log } from "../middleware/logger";

export const generateSchedule = async (depotId: string) => {
  await Log("backend", "info", "service", `Generating schedule for depot: ${depotId}`);

  // Fetch data
  const [depots, vehicles] = await Promise.all([
    getDepots(),
    getVehicles()
  ]);

  const depot = depots.find(d => String(d.ID) === String(depotId));
  if (!depot) {
    throw new Error(`Depot with ID ${depotId} not found`);
  }

  // Optimize using Knapsack algorithm
  const result = await optimizeSchedule(vehicles, depot.MechanicHours);

  return {
    depotId: depot.ID,
    mechanicHours: depot.MechanicHours,
    maxImpact: result.maxImpact,
    totalDuration: result.totalDuration,
    selectedVehicles: result.selectedVehicles
  };
};
