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
exports.generateSchedule = void 0;
const depotRepository_1 = require("../repository/depotRepository");
const vehicleRepository_1 = require("../repository/vehicleRepository");
const knapsack_1 = require("../algorithms/knapsack");
const logger_1 = require("../middleware/logger");
const generateSchedule = (depotId) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, logger_1.Log)("backend", "info", "service", `Generating schedule for depot: ${depotId}`);
    // Fetch data
    const [depots, vehicles] = yield Promise.all([
        (0, depotRepository_1.getDepots)(),
        (0, vehicleRepository_1.getVehicles)()
    ]);
    const depot = depots.find(d => String(d.ID) === String(depotId));
    if (!depot) {
        throw new Error(`Depot with ID ${depotId} not found`);
    }
    // Optimize using Knapsack algorithm
    const result = yield (0, knapsack_1.optimizeSchedule)(vehicles, depot.MechanicHours);
    return {
        depotId: depot.ID,
        mechanicHours: depot.MechanicHours,
        maxImpact: result.maxImpact,
        totalDuration: result.totalDuration,
        selectedVehicles: result.selectedVehicles
    };
});
exports.generateSchedule = generateSchedule;
