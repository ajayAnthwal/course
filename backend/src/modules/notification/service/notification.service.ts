import Notification, { INotification } from "../model/notification.model";
import smsService from "../../services/sms/sms.service";
import whatsappService from "../../services/whatsapp/whatsapp.service";
import AppError from "../../../utils/appError";

interface SendNotificationInput {
  userId?: string;
  type: "sms" | "email" | "whatsapp" | "in-app";
  title: string;
  message: string;
  recipient: string;
  templateId?: string;
}

interface BulkNotificationInput {
  userIds: string[];
  type: "sms" | "email" | "whatsapp" | "in-app";
  title: string;
  message: string;
}

interface NotificationFilters {
  type?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

class NotificationService {
  async send(input: SendNotificationInput): Promise<INotification> {
    const notification = await Notification.create({
      user: input.userId,
      type: input.type,
      title: input.title,
      message: input.message,
      recipient: input.recipient,
      templateId: input.templateId,
      status: "pending",
    });

    try {
      let result: any;

      switch (input.type) {
        case "sms":
          result = await smsService.sendSMS(input.recipient, input.message);
          break;
        case "whatsapp":
          result = await whatsappService.sendMessage(input.recipient, input.message);
          break;
        case "email":
          result = { success: true };
          break;
        case "in-app":
          result = { success: true };
          break;
      }

      if (result?.success) {
        notification.status = "sent";
        notification.sentAt = new Date();
      } else {
        notification.status = "failed";
        notification.error = result?.error || "Failed to send";
      }
    } catch (error: any) {
      notification.status = "failed";
      notification.error = error.message;
    }

    await notification.save();
    return notification;
  }

  async sendBulk(input: BulkNotificationInput): Promise<{ sent: number; failed: number; notifications: INotification[] }> {
    const notifications: INotification[] = [];
    let sent = 0;
    let failed = 0;

    for (const userId of input.userIds) {
      try {
        const notification = await this.send({
          userId,
          type: input.type,
          title: input.title,
          message: input.message,
          recipient: userId,
        });
        notifications.push(notification);
        if (notification.status === "sent") sent++;
        else failed++;
      } catch (error) {
        failed++;
      }
    }

    return { sent, failed, notifications };
  }

  async getAll(filters: NotificationFilters): Promise<{ notifications: INotification[]; total: number; page: number; totalPages: number }> {
    const query: any = {};

    if (filters.type) query.type = filters.type;
    if (filters.status) query.status = filters.status;
    if (filters.startDate || filters.endDate) {
      query.createdAt = {};
      if (filters.startDate) query.createdAt.$gte = new Date(filters.startDate);
      if (filters.endDate) query.createdAt.$lte = new Date(filters.endDate);
    }

    const page = filters.page || 1;
    const limit = filters.limit || 20;
    const skip = (page - 1) * limit;

    const notifications = await Notification.find(query)
      .populate("user", "name email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Notification.countDocuments(query);

    return {
      notifications,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getUserNotifications(userId: string): Promise<INotification[]> {
    return Notification.find({ user: userId })
      .sort({ createdAt: -1 })
      .limit(50);
  }

  async markAsRead(id: string): Promise<INotification> {
    const notification = await Notification.findByIdAndUpdate(
      id,
      { status: "sent" },
      { new: true }
    );
    if (!notification) throw new AppError("Notification not found", 404);
    return notification;
  }

  async getTemplates(): Promise<{ id: string; name: string; type: string; content: string }[]> {
    return [
      { id: "welcome", name: "Welcome Message", type: "email", content: "Welcome to EduPortal! We're glad to have you." },
      { id: "lead-assigned", name: "Lead Assigned", type: "in-app", content: "A new lead has been assigned to you." },
      { id: "payment-success", name: "Payment Successful", type: "email", content: "Your payment was successful. Thank you!" },
      { id: "lead-update", name: "Lead Status Update", type: "whatsapp", content: "Your inquiry status has been updated." },
    ];
  }
}

export default new NotificationService();