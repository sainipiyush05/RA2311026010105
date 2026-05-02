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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const env_1 = require("./config/env");
const logger_1 = require("./middleware/logger");
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        app_1.default.listen(env_1.ENV.PORT, () => __awaiter(void 0, void 0, void 0, function* () {
            console.log(`🚀 Server running on port ${env_1.ENV.PORT}`);
            yield (0, logger_1.Log)("backend", "info", "config", `Server successfully started on port ${env_1.ENV.PORT}`);
        }));
        // Handle Uncaught Exceptions
        process.on("uncaughtException", (error) => __awaiter(void 0, void 0, void 0, function* () {
            console.error("Uncaught Exception:", error);
            yield (0, logger_1.Log)("backend", "fatal", "config", `Uncaught Exception: ${error.message}`);
            process.exit(1);
        }));
        // Handle Unhandled Promise Rejections
        process.on("unhandledRejection", (reason) => __awaiter(void 0, void 0, void 0, function* () {
            console.error("Unhandled Rejection:", reason);
            yield (0, logger_1.Log)("backend", "fatal", "config", `Unhandled Rejection: ${reason.message || reason}`);
            process.exit(1);
        }));
    }
    catch (error) {
        console.error("Failed to start server", error);
        process.exit(1);
    }
});
startServer();
