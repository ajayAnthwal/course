import ActivityLog, { IActivityLog } from "../model/activity-log.model";
import mongoose from "mongoose";

interface GetActivityLogsQuery {
  page?: string;
  limit?: string;
  action?: string;
  resource?: string;
  userId?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
}

class ActivityLogService {
  async logActivity(data: {
    userId?: string;
    action: string;
    resource: string;
    resourceId?: string;
    details?: Record<string, any>;
    ipAddress?: string;
    userAgent?: string;
    status?: "success" | "failure";
    errorMessage?: string;
  }): Promise<IActivityLog> {
    const log = await ActivityLog.create({
      user: data.userId,
      action: data.action,
      resource: data.resource,
      resourceId: data.resourceId,
      details: data.details,
      ipAddress: data.ipAddress,
      userAgent: data.userAgent,
      status: data.status || "success",
      errorMessage: data.errorMessage,
    });
    return log;
  }

  async getAllActivityLogs(query: GetActivityLogsQuery) {
    const page = parseInt(query.page || "1", 10);
    const limit = parseInt(query.limit || "20", 10);
    const skip = (page - 1) * limit;

    const filter: any = {};

    if (query.action) filter.action = query.action;
    if (query.resource) filter.resource = query.resource;
    if (query.userId) filter.user = new mongoose.Types.ObjectId(query.userId);
    if (query.status) filter.status = query.status;

    if (query.startDate || query.endDate) {
      filter.createdAt = {};
      if (query.startDate) filter.createdAt.$gte = new Date(query.startDate);
      if (query.endDate) filter.createdAt.$lte = new Date(query.endDate);
    }

    const [logs, total] = await Promise.all([
      ActivityLog.find(filter)
        .populate("user", "name email role")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      ActivityLog.countDocuments(filter),
    ]);

    return {
      logs,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getActivityStats(startDate?: string, endDate?: string) {
    const filter: any = {};
    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) filter.createdAt.$gte = new Date(startDate);
      if (endDate) filter.createdAt.$lte = new Date(endDate);
    }

    const [totalLogs, loginAttempts, failedAttempts, recentActivity] = await Promise.all([
      ActivityLog.countDocuments(filter),
      ActivityLog.countDocuments({ ...filter, action: "login" }),
      ActivityLog.countDocuments({ ...filter, action: "login_failed" }),
      ActivityLog.countDocuments({
        ...filter,
        createdAt: {
          $gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
        },
      }),
    ]);

    const resourceBreakdown = await ActivityLog.aggregate([
      { $match: filter },
      { $group: { _id: "$resource", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    const actionBreakdown = await ActivityLog.aggregate([
      { $match: filter },
      { $group: { _id: "$action", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    return {
      totalLogs,
      loginAttempts,
      failedAttempts,
      recentActivity,
      resourceBreakdown: resourceBreakdown.map((r) => ({ resource: r._id, count: r.count })),
      actionBreakdown: actionBreakdown.map((a) => ({ action: a._id, count: a.count })),
    };
  }

  async getUserActivity(userId: string, limit: number = 10) {
    return ActivityLog.find({ user: userId })
      .sort({ createdAt: -1 })
      .limit(limit);
  }

  async clearOldLogs(days: number = 90): Promise<number> {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    
    const result = await ActivityLog.deleteMany({
      createdAt: { $lt: cutoffDate },
    });

    return result.deletedCount;
  }
}

export default new ActivityLogService();