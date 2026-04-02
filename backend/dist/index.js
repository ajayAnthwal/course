"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const path_1 = __importDefault(require("path"));
const mongoose_1 = __importDefault(require("mongoose"));
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
const category_route_1 = __importDefault(require("./modules/category/route/category.route"));
const blog_route_1 = __importDefault(require("./modules/blog/route/blog.route"));
const testimonial_route_1 = __importDefault(require("./modules/testimonial/route/testimonial.route"));
const college_model_1 = __importDefault(require("./modules/college/model/college.model"));
const course_model_1 = __importDefault(require("./modules/course/model/course.model"));
const user_model_1 = __importDefault(require("./modules/user/model/user.model"));
const news_model_1 = __importDefault(require("./modules/news/model/news.model"));
const blog_model_1 = __importDefault(require("./modules/blog/model/blog.model"));
const category_model_1 = __importDefault(require("./modules/category/model/category.model"));
const testimonial_model_1 = __importDefault(require("./modules/testimonial/model/testimonial.model"));
const appError_1 = __importDefault(require("./utils/appError"));
const app = (0, express_1.default)();
// CORS
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        // Allow requests with no origin (mobile apps, curl, same-origin)
        if (!origin)
            return callback(null, true);
        const allowed = [
            config_1.default.frontendUrl,
            "http://localhost:3000",
            "http://localhost:3001",
            "https://course-frontend-ruddy.vercel.app",
        ];
        if (allowed.includes(origin))
            return callback(null, true);
        return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
}));
app.use(express_1.default.json({ limit: "10mb" }));
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
// Serve uploaded files
app.use("/uploads", express_1.default.static(path_1.default.join(process.cwd(), "uploads")));
// Root route
app.get("/", (_req, res) => {
    res.status(200).json({ success: true, message: "EduPortal API is running", version: "1.0.0" });
});
// Health check
app.get("/api/health", (_req, res) => {
    const dbState = mongoose_1.default.connection.readyState; // 0=disconnected, 1=connected, 2=connecting, 3=disconnecting
    const dbStatus = dbState === 1 ? "connected" : dbState === 2 ? "connecting" : "disconnected";
    const isHealthy = dbState === 1;
    res.status(isHealthy ? 200 : 503).json({
        success: isHealthy,
        message: isHealthy ? "Server is healthy" : "Server running but database unavailable",
        database: dbStatus,
        timestamp: new Date().toISOString(),
    });
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
app.use("/api/categories", category_route_1.default);
app.use("/api/blogs", blog_route_1.default);
app.use("/api/testimonials", testimonial_route_1.default);
// Site stats (calculated from DB)
app.get("/api/stats", async (_req, res) => {
    try {
        const [colleges, courses, students, news, blogs, categories, testimonials] = await Promise.all([
            college_model_1.default.countDocuments({ isActive: true }),
            course_model_1.default.countDocuments({ isActive: true }),
            user_model_1.default.countDocuments({ role: "student", isActive: true }),
            news_model_1.default.countDocuments({ isActive: true }),
            blog_model_1.default.countDocuments({ isActive: true }),
            category_model_1.default.countDocuments({ isActive: true }),
            testimonial_model_1.default.countDocuments({ isActive: true }),
        ]);
        res.status(200).json({
            success: true,
            data: { colleges, courses, students, news, blogs, categories, testimonials },
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
// 404 handler
app.all("*", (req, _res, next) => {
    next(new appError_1.default(`Can't find ${req.originalUrl} on this server!`, 404));
});
// Global error handler
app.use(errorHandler_1.default);
// Start server
const startServer = async () => {
    let dbConnected = false;
    try {
        await (0, database_1.default)();
        dbConnected = true;
    }
    catch (error) {
        console.error("Starting server without database connection. Some features will be unavailable.");
    }
    app.listen(config_1.default.port, "0.0.0.0", () => {
        console.log("");
        console.log("==========================================");
        console.log(`  Server running in ${config_1.default.nodeEnv} mode`);
        console.log(`  Local:   http://localhost:${config_1.default.port}`);
        console.log(`  API:     http://localhost:${config_1.default.port}/api`);
        console.log(`  Health:  http://localhost:${config_1.default.port}/api/health`);
        console.log(`  MongoDB: ${dbConnected ? "Connected" : "Disconnected"}`);
        console.log("==========================================");
        console.log("");
    });
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