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
exports.validateRequest = void 0;
const logger_1 = require("./logger");
const validateRequest = (schema) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (schema && typeof schema.validate === 'function') {
                const { error } = schema.validate(req.body);
                if (error) {
                    yield (0, logger_1.Log)("backend", "warn", "middleware", `Validation failed: ${error.message}`);
                    res.status(400).json({ error: error.message });
                    return;
                }
            }
            next();
        }
        catch (err) {
            yield (0, logger_1.Log)("backend", "error", "middleware", `Validation error: ${err.message}`);
            res.status(400).json({ error: err.message });
        }
    });
};
exports.validateRequest = validateRequest;
