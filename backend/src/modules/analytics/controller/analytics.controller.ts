import { Request, Response, NextFunction } from "express";
import analyticsService from "../service/analytics.service";
import catchAsync from "../../../utils/catchAsync";

export const getDashboardStats = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const stats = await analyticsService.getDashboardStats();

  res.status(200).json({
    success: true,
    message: "Dashboard stats retrieved successfully",
    data: stats,
  });
});

export const getRevenueStats = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const { startDate, endDate } = req.query;
  const stats = await analyticsService.getRevenueStats({
    startDate: startDate as string,
    endDate: endDate as string,
  });

  res.status(200).json({
    success: true,
    message: "Revenue stats retrieved successfully",
    data: stats,
  });
});

export const getLeadAnalytics = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const { startDate, endDate } = req.query;
  const stats = await analyticsService.getLeadAnalytics({
    startDate: startDate as string,
    endDate: endDate as string,
  });

  res.status(200).json({
    success: true,
    message: "Lead analytics retrieved successfully",
    data: stats,
  });
});

export const getCollegePerformance = catchAsync(async (_req: Request, res: Response, _next: NextFunction) => {
  const colleges = await analyticsService.getCollegePerformance();

  res.status(200).json({
    success: true,
    message: "College performance retrieved successfully",
    data: colleges,
  });
});