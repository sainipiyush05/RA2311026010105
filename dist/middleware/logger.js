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
exports.Log = void 0;
const axios_1 = __importDefault(require("axios"));
const env_1 = require("../config/env");
// Simple retry logic helper
const retryRequest = (fn_1, ...args_1) => __awaiter(void 0, [fn_1, ...args_1], void 0, function* (fn, retries = 3, delay = 1000) {
    for (let i = 0; i < retries; i++) {
        try {
            return yield fn();
        }
        catch (error) {
            if (i === retries - 1)
                throw error;
            yield new Promise(res => setTimeout(res, delay));
        }
    }
});
const Log = (stack, level, packageName, message) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        if (!env_1.ENV.TOKEN) {
            console.warn("Log function called but no TOKEN is set.");
            return;
        }
        const payload = { stack, level, package: packageName, message };
        const apiCall = () => axios_1.default.post(env_1.ENV.LOGGING_API, payload, {
            headers: {
                Authorization: `Bearer ${env_1.ENV.TOKEN}`,
                "Content-Type": "application/json",
            },
            timeout: 5000,
        });
        const response = yield retryRequest(apiCall, 3, 500);
        // Logging to console in development
        if (process.env.NODE_ENV !== "production") {
            console.log(`[Remote Log Success] [${level.toUpperCase()}] [${packageName}] ${message}`);
        }
    }
    catch (error) {
        console.error(`[Remote Log Failed] [${level.toUpperCase()}] [${packageName}] ${message} - Error:`, ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || error.message);
    }
});
exports.Log = Log;
