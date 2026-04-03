import { Response, NextFunction } from "express";
import notificationService from "../service/notification.service";
import catchAsync from "../../../utils/catchAsync";

export const sendNotification = catchAsync(async (req: any, res: Response, _next: NextFunction) => {
  const notification = await notificationService.send({
    userId: req.body.userId,
    type: req.body.type,
    title: req.body.title,
    message: req.body.message,
    recipient: req.body.recipient,
    templateId: req.body.templateId,
  });

  res.status(201).json({
    success: true,
    message: "Notification sent successfully",
    data: notification,
  });
});

export const sendBulkNotification = catchAsync(async (req: any, res: Response, _next: NextFunction) => {
  const result = await notificationService.sendBulk({
    userIds: req.body.userIds,
    type: req.body.type,
    title: req.body.title,
    message: req.body.message,
  });

  res.status(201).json({
    success: true,
    message: `Sent ${result.sent}, Failed ${result.failed}`,
    data: result,
  });
});

export const getAllNotifications = catchAsync(async (req: any, res: Response, _next: NextFunction) => {
  const { page, limit, type, status, startDate, endDate } = req.query;

  const result = await notificationService.getAll({
    page: page ? parseInt(page as string) : undefined,
    limit: limit ? parseInt(limit as string) : undefined,
    type: type as string,
    status: status as string,
    startDate: startDate as string,
    endDate: endDate as string,
  });

  res.status(200).json({
    success: true,
    message: "Notifications retrieved successfully",
    data: result.notifications,
    pagination: {
      page: result.page,
      limit: limit ? parseInt(limit as string) : 20,
      total: result.total,
      totalPages: result.totalPages,
    },
  });
});

export const getMyNotifications = catchAsync(async (req: any, res: Response, _next: NextFunction) => {
  const notifications = await notificationService.getUserNotifications(req.user.id);

  res.status(200).json({
    success: true,
    message: "Notifications retrieved successfully",
    data: notifications,
  });
});

export const markAsRead = catchAsync(async (req: any, res: Response, _next: NextFunction) => {
  const notification = await notificationService.markAsRead(req.params.id);

  res.status(200).json({
    success: true,
    message: "Notification marked as read",
    data: notification,
  });
});

export const getTemplates = catchAsync(async (_req: any, res: Response, _next: NextFunction) => {
  const templates = await notificationService.getTemplates();

  res.status(200).json({
    success: true,
    message: "Templates retrieved successfully",
    data: templates,
  });
});