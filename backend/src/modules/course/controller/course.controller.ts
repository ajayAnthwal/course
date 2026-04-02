import { Request, Response, NextFunction } from "express";
import courseService from "../service/course.service";
import catchAsync from "../../../utils/catchAsync";

export const getAllCourses = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const result = await courseService.getAllCourses(req.query as any);
  res.status(200).json({ success: true, message: "Courses retrieved", data: result.courses, pagination: result.pagination });
});

export const getCourseById = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const course = await courseService.getCourseById(req.params.id as string);
  res.status(200).json({ success: true, message: "Course retrieved", data: course });
});

export const getCourseBySlug = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const course = await courseService.getCourseBySlug(req.params.slug as string);
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
  const data: any = { ...req.body };
  if (req.file) data.image = `/uploads/${req.file.filename}`;
  if (typeof data.fees === "string") try { data.fees = JSON.parse(data.fees); } catch {}
  if (typeof data.averageSalary === "string") try { data.averageSalary = JSON.parse(data.averageSalary); } catch {}
  if (typeof data.careerOpportunities === "string") try { data.careerOpportunities = JSON.parse(data.careerOpportunities); } catch {}
  if (typeof data.topRecruiters === "string") try { data.topRecruiters = JSON.parse(data.topRecruiters); } catch {}
  if (typeof data.entranceExams === "string") try { data.entranceExams = JSON.parse(data.entranceExams); } catch {}
  if (typeof data.specializations === "string") try { data.specializations = JSON.parse(data.specializations); } catch {}
  if (data.durationYears) data.durationYears = Number(data.durationYears);
  if (data.collegeCount) data.collegeCount = Number(data.collegeCount);
  if (data.rating) data.rating = Number(data.rating);
  const course = await courseService.createCourse(data);
  res.status(201).json({ success: true, message: "Course created", data: course });
});

export const updateCourse = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const data: any = { ...req.body };
  if (req.file) data.image = `/uploads/${req.file.filename}`;
  if (typeof data.fees === "string") try { data.fees = JSON.parse(data.fees); } catch {}
  if (typeof data.averageSalary === "string") try { data.averageSalary = JSON.parse(data.averageSalary); } catch {}
  if (typeof data.careerOpportunities === "string") try { data.careerOpportunities = JSON.parse(data.careerOpportunities); } catch {}
  if (typeof data.topRecruiters === "string") try { data.topRecruiters = JSON.parse(data.topRecruiters); } catch {}
  if (typeof data.entranceExams === "string") try { data.entranceExams = JSON.parse(data.entranceExams); } catch {}
  if (typeof data.specializations === "string") try { data.specializations = JSON.parse(data.specializations); } catch {}
  if (data.durationYears) data.durationYears = Number(data.durationYears);
  if (data.collegeCount) data.collegeCount = Number(data.collegeCount);
  if (data.rating) data.rating = Number(data.rating);
  const course = await courseService.updateCourse(req.params.id as string, data);
  res.status(200).json({ success: true, message: "Course updated", data: course });
});

export const deleteCourse = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  await courseService.deleteCourse(req.params.id as string);
  res.status(200).json({ success: true, message: "Course deleted" });
});
