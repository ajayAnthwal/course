"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const appError_1 = __importDefault(require("../utils/appError"));
const config_1 = __importDefault(require("../config"));
const handleCastErrorDB = (err) => {
    const message = `Invalid ${err.path}: ${err.value}`;
    return new appError_1.default(message, 400);
};
const handleDuplicateFieldsDB = (err) => {
    const value = Object.values(err.keyValue).join(", ");
    const message = `Duplicate field value: ${value}. Please use another value.`;
    return new appError_1.default(message, 400);
};
const handleValidationErrorDB = (err) => {
    const errors = Object.values(err.errors).map((el) => el.message);
    const message = `Invalid input data. ${errors.join(". ")}`;
    return new appError_1.default(message, 400);
};
const handleJWTError = () => new appError_1.default("Invalid token. Please log in again.", 401);
const handleJWTExpiredError = () => new appError_1.default("Your token has expired. Please log in again.", 401);
const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        success: false,
        error: err,
        message: err.message,
        stack: err.stack,
    });
};
const sendErrorProd = (err, res) => {
    if (err.isOperational) {
        res.status(err.statusCode).json({
            success: false,
            message: err.message,
        });
    }
    else {
        console.error("ERROR 💥", err);
        res.status(500).json({
            success: false,
            message: "Something went very wrong!",
        });
    }
};
const errorHandler = (err, _req, res, _next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";
    if (config_1.default.nodeEnv === "development") {
        sendErrorDev(err, res);
    }
    else {
        let error = { ...err, message: err.message };
        if (err.name === "CastError")
            error = handleCastErrorDB(err);
        if (err.code === 11000)
            error = handleDuplicateFieldsDB(err);
        if (err.name === "ValidationError")
            error = handleValidationErrorDB(err);
        if (err.name === "JsonWebTokenError")
            error = handleJWTError();
        if (err.name === "TokenExpiredError")
            error = handleJWTExpiredError();
        sendErrorProd(error, res);
    }
};
exports.default = errorHandler;
//# sourceMappingURL=errorHandler.js.map