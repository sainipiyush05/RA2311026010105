"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHealth = void 0;
const responseFormatter_1 = require("../utils/responseFormatter");
const getHealth = (req, res) => {
    const data = {
        status: "UP",
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
    };
    (0, responseFormatter_1.sendSuccess)(res, data, "System is healthy");
};
exports.getHealth = getHealth;
