import { Request, Response, NextFunction } from "express";
import applicationService from "../service/application.service";
import catchAsync from "../../../utils/catchAsync";

export const getApplications = catchAsync(async (req: any, res: Response, _next: NextFunction) => {
  const { page, limit, status, paymentStatus } = req.query;
  const result = await applicationService.getUserApplications(
    req.user?.id,
    { status: status as string, paymentStatus: paymentStatus as string },
    parseInt(page as string || "1", 10),
    parseInt(limit as string || "20", 10)
  );

  res.status(200).json({
    success: true,
    message: "Applications retrieved successfully",
    data: result.applications,
    pagination: result.pagination,
  });
});

export const getApplicationById = catchAsync(async (req: any, res: Response, _next: NextFunction) => {
  const application = await applicationService.getApplicationById(req.params.id, req.user?.id);

  res.status(200).json({
    success: true,
    message: "Application retrieved successfully",
    data: application,
  });
});

export const createApplication = catchAsync(async (req: any, res: Response, _next: NextFunction) => {
  const { collegeId, course, formData, paymentAmount } = req.body;
  const application = await applicationService.createApplication(req.user?.id, {
    college: collegeId,
    course,
    formData,
    paymentAmount,
  });

  res.status(201).json({
    success: true,
    message: "Application submitted successfully",
    data: application,
  });
});

export const updateApplication = catchAsync(async (req: any, res: Response, _next: NextFunction) => {
  const { status, notes, formData } = req.body;
  const application = await applicationService.updateApplication(req.params.id, req.user?.id, {
    status,
    notes,
    formData,
  });

  res.status(200).json({
    success: true,
    message: "Application updated successfully",
    data: application,
  });
});

export const updatePayment = catchAsync(async (req: any, res: Response, _next: NextFunction) => {
  const { paymentId, status } = req.body;
  const application = await applicationService.updatePaymentStatus(req.params.id, req.user?.id, paymentId, status);

  res.status(200).json({
    success: true,
    message: "Payment updated successfully",
    data: application,
  });
});

export const cancelApplication = catchAsync(async (req: any, res: Response, _next: NextFunction) => {
  const application = await applicationService.cancelApplication(req.params.id, req.user?.id);

  res.status(200).json({
    success: true,
    message: "Application cancelled successfully",
    data: application,
  });
});

export const getApplicationStats = catchAsync(async (req: any, res: Response, _next: NextFunction) => {
  const stats = await applicationService.getStats(req.user?.id);

  res.status(200).json({
    success: true,
    message: "Application stats retrieved successfully",
    data: stats,
  });
});