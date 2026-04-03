import { Request, Response, NextFunction } from "express";
import testimonialService from "../service/testimonial.service";
import catchAsync from "../../../utils/catchAsync";

export const getAllTestimonials = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const result = await testimonialService.getAll(req.query as any);
  res.status(200).json({
    success: true,
    message: "Testimonials retrieved",
    data: result.testimonials,
    pagination: result.pagination,
  });
});

export const getTestimonialById = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const testimonial = await testimonialService.getById(req.params.id as string);
  res.status(200).json({ success: true, message: "Testimonial retrieved", data: testimonial });
});

export const createTestimonial = catchAsync(async (req: any, res: Response, _next: NextFunction) => {
  const data: any = { ...req.body };
  if (req.file) data.avatar = `/uploads/${req.file.filename}`;
  if (req.user?.id) data.user = req.user.id;
  const testimonial = await testimonialService.create(data);
  res.status(201).json({ success: true, message: "Testimonial submitted for review", data: testimonial });
});

export const updateTestimonial = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const data: any = { ...req.body };
  if (req.file) data.avatar = `/uploads/${req.file.filename}`;
  const testimonial = await testimonialService.update(req.params.id as string, data);
  res.status(200).json({ success: true, message: "Testimonial updated", data: testimonial });
});

export const deleteTestimonial = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  await testimonialService.delete(req.params.id as string);
  res.status(200).json({ success: true, message: "Testimonial deleted" });
});

export const approveTestimonial = catchAsync(async (req: any, res: Response, _next: NextFunction) => {
  const testimonial = await testimonialService.approve(req.params.id as string, req.user?.id);
  res.status(200).json({ success: true, message: "Testimonial approved", data: testimonial });
});

export const rejectTestimonial = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const { reason } = req.body;
  const testimonial = await testimonialService.reject(req.params.id as string, reason);
  res.status(200).json({ success: true, message: "Testimonial rejected", data: testimonial });
});

export const toggleFeatured = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const testimonial = await testimonialService.toggleFeatured(req.params.id as string);
  res.status(200).json({ success: true, message: "Featured status updated", data: testimonial });
});

export const getTestimonialStats = catchAsync(async (_req: Request, res: Response, _next: NextFunction) => {
  const stats = await testimonialService.getStats();
  res.status(200).json({ success: true, message: "Stats retrieved", data: stats });
});

export const getPendingCount = catchAsync(async (_req: Request, res: Response, _next: NextFunction) => {
  const count = await testimonialService.getPendingCount();
  res.status(200).json({ success: true, message: "Pending count retrieved", data: { count } });
});