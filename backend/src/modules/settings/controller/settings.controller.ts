import { Request, Response, NextFunction } from "express";
import settingsService from "../service/settings.service";
import catchAsync from "../../../utils/catchAsync";

export const getSetting = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const { key } = req.params;
  const value = await settingsService.getSetting(key);
  res.status(200).json({ success: true, data: { key, value } });
});

export const getAllSettings = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const { category } = req.query;
  const settings = category
    ? await settingsService.getSettingsByCategory(category as string)
    : await settingsService.getAllSettings();
  res.status(200).json({ success: true, data: settings });
});

export const setSetting = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const { key, value, category, description } = req.body;
  const setting = await settingsService.setSetting(key, value, category, description);
  res.status(200).json({ success: true, message: "Setting updated", data: setting });
});

export const deleteSetting = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const { key } = req.params;
  await settingsService.deleteSetting(key);
  res.status(200).json({ success: true, message: "Setting deleted" });
});

export const getPublicSettings = catchAsync(async (_req: Request, res: Response, _next: NextFunction) => {
  const settings = await settingsService.getPublicSettings();
  res.status(200).json({ success: true, data: settings });
});