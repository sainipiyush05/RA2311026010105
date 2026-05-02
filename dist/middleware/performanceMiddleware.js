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
exports.performanceMiddleware = void 0;
const logger_1 = require("./logger");
const performanceMiddleware = (req, res, next) => {
    const start = Date.now();
    res.on("finish", () => __awaiter(void 0, void 0, void 0, function* () {
        const duration = Date.now() - start;
        if (duration > 1000) {
            // Log slow queries/requests
            yield (0, logger_1.Log)("backend", "warn", "middleware", `Slow API Response: ${req.method} ${req.originalUrl} took ${duration}ms`);
        }
        else {
            yield (0, logger_1.Log)("backend", "debug", "middleware", `Performance: ${req.method} ${req.originalUrl} took ${duration}ms`);
        }
    }));
    next();
};
exports.performanceMiddleware = performanceMiddleware;
