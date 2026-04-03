import express from "express";
import { getDashboardStats, getRevenueStats, getLeadAnalytics, getCollegePerformance } from "../controller/analytics.controller";
import { authenticate, authorize } from "../../../middlewares/auth";

const router = express.Router();

router.get("/dashboard", authenticate, authorize(["admin"]), getDashboardStats);
router.get("/revenue", authenticate, authorize(["admin"]), getRevenueStats);
router.get("/leads", authenticate, authorize(["admin"]), getLeadAnalytics);
router.get("/colleges", authenticate, authorize(["admin"]), getCollegePerformance);

export default router;