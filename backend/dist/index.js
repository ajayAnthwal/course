"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const config_1 = __importDefault(require("./config"));
const database_1 = __importDefault(require("./config/database"));
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
const auth_route_1 = __importDefault(require("./modules/auth/route/auth.route"));
const user_route_1 = __importDefault(require("./modules/user/route/user.route"));
const college_route_1 = __importDefault(require("./modules/college/route/college.route"));
const course_route_1 = __importDefault(require("./modules/course/route/course.route"));
const exam_route_1 = __importDefault(require("./modules/exam/route/exam.route"));
const news_route_1 = __importDefault(require("./modules/news/route/news.route"));
const lead_route_1 = __importDefault(require("./modules/lead/route/lead.route"));
const payment_route_1 = __importDefault(require("./modules/payment/route/payment.route"));
const appError_1 = __importDefault(require("./utils/appError"));
const app = (0, express_1.default)();
// CORS
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        // Allow requests with no origin (mobile apps, curl, same-origin)
        if (!origin)
            return callback(null, true);
        const allowed = [config_1.default.frontendUrl, "http://localhost:3000", "http://localhost:3001"];
        if (allowed.includes(origin))
            return callback(null, true);
        return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
}));
app.use(express_1.default.json({ limit: "10mb" }));
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
// Root route
app.get("/", (_req, res) => {
    res.status(200).json({ success: true, message: "EduPortal API is running", version: "1.0.0" });
});
// Health check
app.get("/api/health", (_req, res) => {
    res.status(200).json({ success: true, message: "Server is healthy", timestamp: new Date().toISOString() });
});
// API routes
app.use("/api/auth", auth_route_1.default);
app.use("/api/users", user_route_1.default);
app.use("/api/colleges", college_route_1.default);
app.use("/api/courses", course_route_1.default);
app.use("/api/exams", exam_route_1.default);
app.use("/api/news", news_route_1.default);
app.use("/api/leads", lead_route_1.default);
app.use("/api/payments", payment_route_1.default);
// 404 handler
app.all("*", (req, _res, next) => {
    next(new appError_1.default(`Can't find ${req.originalUrl} on this server!`, 404));
});
// Global error handler
app.use(errorHandler_1.default);
// Start server
const startServer = async () => {
    try {
        await (0, database_1.default)();
        app.listen(config_1.default.port, "0.0.0.0", () => {
            console.log("");
            console.log("==========================================");
            console.log(`  Server running in ${config_1.default.nodeEnv} mode`);
            console.log(`  Local:   http://localhost:${config_1.default.port}`);
            console.log(`  API:     http://localhost:${config_1.default.port}/api`);
            console.log(`  Health:  http://localhost:${config_1.default.port}/api/health`);
            console.log(`  MongoDB: ${config_1.default.mongodbUri}`);
            console.log("==========================================");
            console.log("");
        });
    }
    catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};
// Handle uncaught errors
process.on("unhandledRejection", (err) => {
    console.error("UNHANDLED REJECTION:", err.message);
    process.exit(1);
});
process.on("uncaughtException", (err) => {
    console.error("UNCAUGHT EXCEPTION:", err.message);
    process.exit(1);
});
startServer();
exports.default = app;
//# sourceMappingURL=index.js.map