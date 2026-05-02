"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundHandler = void 0;
const notFoundHandler = (req, res, next) => {
    res.status(404);
    const error = new Error(`Route Not Found - ${req.originalUrl}`);
    next(error); // Passes the error to the global error middleware
};
exports.notFoundHandler = notFoundHandler;
