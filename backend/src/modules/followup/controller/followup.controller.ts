import { Request, Response, NextFunction } from "express";
import followupService from "../service/followup.service";
import catchAsync from "../../../utils/catchAsync";

export const getAllFollowups = catchAsync(async (req: any, res: Response, _next: NextFunction) => {
  const result = await followupService.getAllFollowups(req.query, req.user?.id);

  res.status(200).json({
    success: true,
    message: "Followups retrieved successfully",
    data: result.followups,
    pagination: result.pagination,
  });
});

export const getFollowupById = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const followup = await followupService.getFollowupById(req.params.id);

  res.status(200).json({
    success: true,
    message: "Followup retrieved successfully",
    data: followup,
  });
});

export const createFollowup = catchAsync(async (req: any, res: Response, _next: NextFunction) => {
  const followup = await followupService.createFollowup(req.body, req.user?.id);

  res.status(201).json({
    success: true,
    message: "Followup created successfully",
    data: followup,
  });
});

export const updateFollowup = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const followup = await followupService.updateFollowup(req.params.id, req.body);

  res.status(200).json({
    success: true,
    message: "Followup updated successfully",
    data: followup,
  });
});

export const deleteFollowup = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  await followupService.deleteFollowup(req.params.id);

  res.status(200).json({
    success: true,
    message: "Followup deleted successfully",
  });
});

export const getFollowupStats = catchAsync(async (req: any, res: Response, _next: NextFunction) => {
  const stats = await followupService.getFollowupStats(req.user?.id);

  res.status(200).json({
    success: true,
    message: "Followup stats retrieved successfully",
    data: stats,
  });
});

export const getUpcomingFollowups = catchAsync(async (req: any, res: Response, _next: NextFunction) => {
  const followups = await followupService.getUpcomingFollowups(req.user?.id);

  res.status(200).json({
    success: true,
    message: "Upcoming followups retrieved successfully",
    data: followups,
  });
});