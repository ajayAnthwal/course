import { Request, Response, NextFunction } from "express";
import courseService from "../service/course.service";
import catchAsync from "../../../utils/catchAsync";

export const getAllCourses = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const result = await courseService.getAllCourses(req.query as any);
  res.status(200).json({ success: true, message: "Courses retrieved", data: result.courses, pagination: result.pagination });
});

export const getCourseById = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const course = await courseService.getCourseById(req.params.id);
  res.status(200).json({ success: true, message: "Course retrieved", data: course });
});

export const getCourseBySlug = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const course = await courseService.getCourseBySlug(req.params.slug);
  res.status(200).json({ success: true, message: "Course retrieved", data: course });
});

export const getFeaturedCourses = catchAsync(async (_req: Request, res: Response, _next: NextFunction) => {
  const courses = await courseService.getFeaturedCourses();
  res.status(200).json({ success: true, message: "Featured courses retrieved", data: courses });
});

export const getCourseStats = catchAsync(async (_req: Request, res: Response, _next: NextFunction) => {
  const stats = await courseService.getCourseStats();
  res.status(200).json({ success: true, message: "Course stats retrieved", data: stats });
});

export const createCourse = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const course = await courseService.createCourse(req.body);
  res.status(201).json({ success: true, message: "Course created", data: course });
});

export const updateCourse = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const course = await courseService.updateCourse(req.params.id, req.body);
  res.status(200).json({ success: true, message: "Course updated", data: course });
});

export const deleteCourse = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  await courseService.deleteCourse(req.params.id);
  res.status(200).json({ success: true, message: "Course deleted" });
});
