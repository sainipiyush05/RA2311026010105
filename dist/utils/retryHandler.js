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
exports.withRetry = void 0;
const logger_1 = require("../middleware/logger");
const withRetry = (operation_1, ...args_1) => __awaiter(void 0, [operation_1, ...args_1], void 0, function* (operation, retries = 3, delay = 1000, context = "operation") {
    for (let i = 0; i < retries; i++) {
        try {
            return yield operation();
        }
        catch (error) {
            if (i === retries - 1) {
                yield (0, logger_1.Log)("backend", "error", "utils", `All ${retries} retries failed for ${context}: ${error.message}`);
                throw error;
            }
            yield (0, logger_1.Log)("backend", "warn", "utils", `Retry ${i + 1}/${retries} for ${context} failed. Retrying in ${delay}ms...`);
            yield new Promise(resolve => setTimeout(resolve, delay));
        }
    }
    throw new Error("Retry failed");
});
exports.withRetry = withRetry;
