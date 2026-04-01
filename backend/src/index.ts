import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
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

// Global middleware
app.use(
  cors({
    origin: config.frontendUrl,
    credentials: true,
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Health check
app.get("/api/health", (_req, res) => {
  res.status(200).json({ success: true, message: "Server is running" });
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
  await connectDB();

  app.listen(config.port, () => {
    console.log(
      `Server running in ${config.nodeEnv} mode on port ${config.port}`
    );
  });
};

startServer();

export default app;
