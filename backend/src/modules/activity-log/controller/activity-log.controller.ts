import { Request, Response, NextFunction } from "express";
import activityLogService from "../service/activity-log.service";
import catchAsync from "../../../utils/catchAsync";

export const getAllActivityLogs = catchAsync(async (req: any, res: Response, _next: NextFunction) => {
  const result = await activityLogService.getAllActivityLogs(req.query);

  res.status(200).json({
    success: true,
    message: "Activity logs retrieved successfully",
    data: result.logs,
    pagination: result.pagination,
  });
});

export const getActivityStats = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const { startDate, endDate } = req.query;
  const stats = await activityLogService.getActivityStats(startDate as string, endDate as string);

  res.status(200).json({
    success: true,
    message: "Activity stats retrieved successfully",
    data: stats,
  });
});

export const clearOldLogs = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const { days } = req.query;
  const deletedCount = await activityLogService.clearOldLogs(parseInt(days as string || "90", 10));

  res.status(200).json({
    success: true,
    message: `Deleted ${deletedCount} old activity logs`,
    data: { deletedCount },
  });
});