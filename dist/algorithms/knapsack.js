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
exports.optimizeSchedule = void 0;
const logger_1 = require("../middleware/logger");
/**
 * Solves the 0/1 Knapsack Problem for vehicle maintenance scheduling.
 *
 * Why DP and not Greedy?
 * Greedy fails because selecting items purely based on Impact/Duration ratio
 * might leave unused capacity (MechanicHours) that could have been filled by
 * other combinations to achieve a higher total impact. DP guarantees the
 * optimal solution by evaluating all possibilities via overlapping subproblems.
 *
 * Time Complexity: O(n * W) where n is number of vehicles, W is mechanic hours.
 * Space Complexity: O(n * W) for the DP table.
 */
const optimizeSchedule = (vehicles, mechanicHours) => __awaiter(void 0, void 0, void 0, function* () {
    const n = vehicles.length;
    // Initialize DP table: dp[i][w] stores max impact using first i vehicles and w hours
    const dp = Array.from({ length: n + 1 }, () => Array(mechanicHours + 1).fill(0));
    yield (0, logger_1.Log)("backend", "debug", "utils", `Starting DP Knapsack optimization for ${n} vehicles and ${mechanicHours} hours`);
    // Fill the DP table
    for (let i = 1; i <= n; i++) {
        const v = vehicles[i - 1];
        const duration = Math.ceil(v.Duration); // Ensure integer capacity indexing if required
        const impact = v.Impact;
        for (let w = 1; w <= mechanicHours; w++) {
            if (duration <= w) {
                dp[i][w] = Math.max(dp[i - 1][w], dp[i - 1][w - duration] + impact);
            }
            else {
                dp[i][w] = dp[i - 1][w];
            }
        }
    }
    // Reconstruct selected items
    let res = dp[n][mechanicHours];
    let w = mechanicHours;
    const selectedVehicles = [];
    let totalDuration = 0;
    for (let i = n; i > 0 && res > 0; i--) {
        if (res !== dp[i - 1][w]) {
            // This item was included
            const v = vehicles[i - 1];
            selectedVehicles.push(v);
            const duration = Math.ceil(v.Duration);
            res -= v.Impact;
            w -= duration;
            totalDuration += v.Duration;
        }
    }
    yield (0, logger_1.Log)("backend", "info", "utils", `Optimization complete. Max Impact: ${dp[n][mechanicHours]}, Selected: ${selectedVehicles.length}`);
    return {
        maxImpact: dp[n][mechanicHours],
        selectedVehicles: selectedVehicles.reverse(), // optional: return in original order
        totalDuration,
    };
});
exports.optimizeSchedule = optimizeSchedule;
