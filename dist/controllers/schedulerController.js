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
exports.getSchedule = void 0;
const schedulerService_1 = require("../services/schedulerService");
const responseFormatter_1 = require("../utils/responseFormatter");
const logger_1 = require("../middleware/logger");
const getSchedule = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { depotId } = req.params;
        yield (0, logger_1.Log)("backend", "info", "controller", `Processing schedule request for depot ${depotId}`);
        const schedule = yield (0, schedulerService_1.generateSchedule)(depotId);
        (0, responseFormatter_1.sendSuccess)(res, schedule, "Schedule generated successfully");
    }
    catch (error) {
        if (error.message.includes("not found")) {
            (0, responseFormatter_1.sendError)(res, error.message, 404);
        }
        else {
            next(error); // Pass to centralized error handler
        }
    }
});
exports.getSchedule = getSchedule;
