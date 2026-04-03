import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
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
import categoryRoutes from "./modules/category/route/category.route";
import blogRoutes from "./modules/blog/route/blog.route";
import testimonialRoutes from "./modules/testimonial/route/testimonial.route";
import notificationRoutes from "./modules/notification/route/notification.route";
import roleRoutes from "./modules/role/route/role.route";
import followupRoutes from "./modules/followup/route/followup.route";
import activityLogRoutes from "./modules/activity-log/route/activity-log.route";
import documentRoutes from "./modules/document/route/document.route";
import settingsRoutes from "./modules/settings/route/settings.route";
import analyticsRoutes from "./modules/analytics/route/analytics.route";
import wishlistRoutes from "./modules/wishlist/route/wishlist.route";
import applicationRoutes from "./modules/application/route/application.route";
import reviewRoutes from "./modules/review/route/review.route";
import messageRoutes from "./modules/message/route/message.route";
import College from "./modules/college/model/college.model";
import Course from "./modules/course/model/course.model";
import User from "./modules/user/model/user.model";
import NewsModel from "./modules/news/model/news.model";
import BlogModel from "./modules/blog/model/blog.model";
import CategoryModel from "./modules/category/model/category.model";
import TestimonialModel from "./modules/testimonial/model/testimonial.model";
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

// Performance: Cache-Control headers for static assets and API responses
app.use("/uploads", (_req, res, next) => {
  res.set("Cache-Control", "public, max-age=31536000, immutable");
  next();
});

app.use("/api/health", (_req, res, next) => {
  res.set("Cache-Control", "no-store, max-age=0, must-revalidate");
  next();
});

// Serve uploaded files
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

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
app.use("/api/categories", categoryRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/followups", followupRoutes);
app.use("/api/activity-logs", activityLogRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/messages", messageRoutes);

// Site stats (calculated from DB)
app.get("/api/stats", async (_req, res) => {
  try {
    const [colleges, courses, students, news, blogs, categories, testimonials] = await Promise.all([
      College.countDocuments({ isActive: true }),
      Course.countDocuments({ isActive: true }),
      User.countDocuments({ role: "student", isActive: true }),
      NewsModel.countDocuments({ isActive: true }),
      BlogModel.countDocuments({ isActive: true }),
      CategoryModel.countDocuments({ isActive: true }),
      TestimonialModel.countDocuments({ isActive: true }),
    ]);
    res.status(200).json({
      success: true,
      data: { colleges, courses, students, news, blogs, categories, testimonials },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

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
