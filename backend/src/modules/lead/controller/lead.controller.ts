import { Request, Response, NextFunction } from "express";
import leadService from "../service/lead.service";
import catchAsync from "../../../utils/catchAsync";

export const getAllLeads = catchAsync(async (req: any, res: Response, _next: NextFunction) => {
  const result = await leadService.getAllLeads(req.query, req.user?.id, req.user?.role);

  res.status(200).json({
    success: true,
    message: "Leads retrieved successfully",
    data: result.leads,
    pagination: result.pagination,
  });
});

export const getLeadById = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const lead = await leadService.getLeadById(req.params.id);

  res.status(200).json({
    success: true,
    message: "Lead retrieved successfully",
    data: lead,
  });
});

export const createLead = catchAsync(async (req: any, res: Response, _next: NextFunction) => {
  const lead = await leadService.createLead(req.body, req.user?.id);

  res.status(201).json({
    success: true,
    message: "Lead created successfully",
    data: lead,
  });
});

export const updateLead = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const lead = await leadService.updateLead(req.params.id, req.body);

  res.status(200).json({
    success: true,
    message: "Lead updated successfully",
    data: lead,
  });
});

export const deleteLead = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  await leadService.deleteLead(req.params.id);

  res.status(200).json({
    success: true,
    message: "Lead deleted successfully",
  });
});

export const getLeadStats = catchAsync(async (_req: Request, res: Response, _next: NextFunction) => {
  const stats = await leadService.getLeadStats();

  res.status(200).json({
    success: true,
    message: "Lead stats retrieved successfully",
    data: stats,
  });
});
