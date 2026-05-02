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
exports.requestLogger = void 0;
const logger_1 = require("./logger");
const requestLogger = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const requestId = req.headers["x-request-id"];
    // We don't await this so it doesn't block the request lifecycle
    (0, logger_1.Log)("backend", "info", "route", `[${requestId}] Incoming Request: ${req.method} ${req.originalUrl}`);
    next();
});
exports.requestLogger = requestLogger;
