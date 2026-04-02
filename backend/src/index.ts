import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import config from "./config";
import connectDB from "./config/database";
import errorHandler from "./middlewares/errorHandler";
import authRoutes from "./modules/auth/route/auth.route";
import userRoutes from "./modules/user/route/user.route";
import collegeRoutes from "./modules/college/route/college.route";
import courseRoutes from "./modules/course/route/course.route";
import examRoutes from "./modules/exam/route/exam.route";
import newsRoutes from "./modules/news/route/news.route";
import leadRoutes from "./modules/lead/route/lead.route";
import paymentRoutes from "./modules/payment/route/payment.route";
import AppError from "./utils/appError";

const app = express();

// CORS
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, curl, same-origin)
      if (!origin) return callback(null, true);
      const allowed = [
        config.frontendUrl,
        "http://localhost:3000",
        "http://localhost:3001",
        "https://course-frontend-ruddy.vercel.app",
      ];
      if (allowed.includes(origin)) return callback(null, true);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Root route
app.get("/", (_req, res) => {
  res.status(200).json({ success: true, message: "EduPortal API is running", version: "1.0.0" });
});

// Health check
app.get("/api/health", (_req, res) => {
  const dbState = mongoose.connection.readyState; // 0=disconnected, 1=connected, 2=connecting, 3=disconnecting
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
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/colleges", collegeRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/exams", examRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/payments", paymentRoutes);

// 404 handler
app.all("*", (req, _res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global error handler
app.use(errorHandler);

// Start server
const startServer = async (): Promise<void> => {
  let dbConnected = false;
  try {
    await connectDB();
    dbConnected = true;
  } catch (error) {
    console.error("Starting server without database connection. Some features will be unavailable.");
  }

  app.listen(config.port, "0.0.0.0", () => {
    console.log("");
    console.log("==========================================");
    console.log(`  Server running in ${config.nodeEnv} mode`);
    console.log(`  Local:   http://localhost:${config.port}`);
    console.log(`  API:     http://localhost:${config.port}/api`);
    console.log(`  Health:  http://localhost:${config.port}/api/health`);
    console.log(`  MongoDB: ${dbConnected ? "Connected" : "Disconnected"}`);
    console.log("==========================================");
    console.log("");
  });
};

// Handle uncaught errors
process.on("unhandledRejection", (err: Error) => {
  console.error("UNHANDLED REJECTION:", err.message);
  process.exit(1);
});

process.on("uncaughtException", (err: Error) => {
  console.error("UNCAUGHT EXCEPTION:", err.message);
  process.exit(1);
});

startServer();

export default app;
