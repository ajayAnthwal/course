import { Request, Response, NextFunction } from "express";
import collegeService from "../service/college.service";
import catchAsync from "../../../utils/catchAsync";

export const getAllColleges = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const result = await collegeService.getAllColleges(req.query);

  res.status(200).json({
    success: true,
    message: "Colleges retrieved successfully",
    data: result.colleges,
    pagination: result.pagination,
  });
});

export const getCollegeById = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const college = await collegeService.getCollegeById(req.params.id as string);

  res.status(200).json({
    success: true,
    message: "College retrieved successfully",
    data: college,
  });
});

export const getCollegeBySlug = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const college = await collegeService.getCollegeBySlug(req.params.slug as string);

  res.status(200).json({
    success: true,
    message: "College retrieved successfully",
    data: college,
  });
});

export const createCollege = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const college = await collegeService.createCollege(req.body);

  res.status(201).json({
    success: true,
    message: "College created successfully",
    data: college,
  });
});

export const updateCollege = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const college = await collegeService.updateCollege(req.params.id as string, req.body);

  res.status(200).json({
    success: true,
    message: "College updated successfully",
    data: college,
  });
});

export const deleteCollege = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  await collegeService.deleteCollege(req.params.id as string);

  res.status(200).json({
    success: true,
    message: "College deleted successfully",
  });
});

export const getFeaturedColleges = catchAsync(async (_req: Request, res: Response, _next: NextFunction) => {
  const colleges = await collegeService.getFeaturedColleges();

  res.status(200).json({
    success: true,
    message: "Featured colleges retrieved successfully",
    data: colleges,
  });
});

export const getCollegeStats = catchAsync(async (_req: Request, res: Response, _next: NextFunction) => {
  const stats = await collegeService.getCollegeStats();

  res.status(200).json({
    success: true,
    message: "College stats retrieved successfully",
    data: stats,
  });
});
