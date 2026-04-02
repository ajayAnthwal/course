"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const index_1 = __importDefault(require("./index"));
const connectDB = async () => {
    try {
        const conn = await mongoose_1.default.connect(index_1.default.mongodbUri, {
            serverSelectionTimeoutMS: 5000,
        });
        console.log(`  MongoDB Connected: ${conn.connection.host}/${conn.connection.name}`);
    }
    catch (error) {
        console.error(`  MongoDB Connection Error: ${error.message}`);
        throw error;
    }
    mongoose_1.default.connection.on("error", (err) => {
        console.error("  MongoDB Error after initial connection:", err.message);
    });
    mongoose_1.default.connection.on("disconnected", () => {
        console.warn("  MongoDB disconnected. Attempting reconnect...");
    });
};
exports.default = connectDB;
//# sourceMappingURL=database.js.map