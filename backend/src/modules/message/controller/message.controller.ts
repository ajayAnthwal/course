import { Request, Response, NextFunction } from "express";
import messageService from "../service/message.service";
import catchAsync from "../../../utils/catchAsync";

export const getMyConversations = catchAsync(async (req: any, res: Response, _next: NextFunction) => {
  const conversations = await messageService.getMyConversations(req.user?.id);

  res.status(200).json({
    success: true,
    message: "Conversations retrieved successfully",
    data: conversations,
  });
});

export const createConversation = catchAsync(async (req: any, res: Response, _next: NextFunction) => {
  const { userId: otherUserId, collegeId } = req.body;
  const conversation = await messageService.getOrCreateConversation(
    req.user?.id,
    otherUserId,
    collegeId
  );

  res.status(201).json({
    success: true,
    message: "Conversation created",
    data: conversation,
  });
});

export const getMessages = catchAsync(async (req: any, res: Response, _next: NextFunction) => {
  const result = await messageService.getConversationMessages(
    req.params.conversationId,
    req.user?.id,
    req.query
  );

  res.status(200).json({
    success: true,
    message: "Messages retrieved successfully",
    data: result.messages,
    pagination: result.pagination,
  });
});

export const sendMessage = catchAsync(async (req: any, res: Response, _next: NextFunction) => {
  const { content, attachments } = req.body;
  const message = await messageService.sendMessage(
    req.user?.id,
    req.params.conversationId,
    content,
    attachments
  );

  res.status(201).json({
    success: true,
    message: "Message sent",
    data: message,
  });
});

export const markMessagesAsRead = catchAsync(async (req: any, res: Response, _next: NextFunction) => {
  await messageService.markAsRead(req.user?.id, req.params.conversationId);

  res.status(200).json({
    success: true,
    message: "Messages marked as read",
  });
});

export const deleteMessage = catchAsync(async (req: any, res: Response, _next: NextFunction) => {
  await messageService.deleteMessage(req.params.messageId, req.user?.id);

  res.status(200).json({
    success: true,
    message: "Message deleted",
  });
});

export const getUnreadCount = catchAsync(async (req: any, res: Response, _next: NextFunction) => {
  const count = await messageService.getUnreadCount(req.user?.id);

  res.status(200).json({
    success: true,
    message: "Unread count retrieved",
    data: { unreadCount: count },
  });
});
