import { Request, Response, NextFunction } from "express";
import examService from "../service/exam.service";
import catchAsync from "../../../utils/catchAsync";

export const getAllExams = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const result = await examService.getAllExams(req.query as any);
  res.status(200).json({ success: true, message: "Exams retrieved", data: result.exams, pagination: result.pagination });
});

export const getExamById = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const exam = await examService.getExamById(req.params.id as string);
  res.status(200).json({ success: true, message: "Exam retrieved", data: exam });
});

export const getExamBySlug = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const exam = await examService.getExamBySlug(req.params.slug as string);
  res.status(200).json({ success: true, message: "Exam retrieved", data: exam });
});

export const getFeaturedExams = catchAsync(async (_req: Request, res: Response, _next: NextFunction) => {
  const exams = await examService.getFeaturedExams();
  res.status(200).json({ success: true, message: "Featured exams retrieved", data: exams });
});

export const createExam = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const exam = await examService.createExam(req.body);
  res.status(201).json({ success: true, message: "Exam created", data: exam });
});

export const updateExam = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const exam = await examService.updateExam(req.params.id as string, req.body);
  res.status(200).json({ success: true, message: "Exam updated", data: exam });
});

export const deleteExam = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  await examService.deleteExam(req.params.id as string);
  res.status(200).json({ success: true, message: "Exam deleted" });
});
