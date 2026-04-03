import Followup, { IFollowup } from "../model/followup.model";
import Lead from "../../lead/model/lead.model";
import AppError from "../../../utils/appError";

interface GetFollowupsQuery {
  page?: string;
  limit?: string;
  status?: string;
  lead?: string;
  type?: string;
  priority?: string;
  dueDateFrom?: string;
  dueDateTo?: string;
}

class FollowupService {
  async getAllFollowups(query: GetFollowupsQuery, userId?: string) {
    const page = parseInt(query.page || "1", 10);
    const limit = parseInt(query.limit || "10", 10);
    const skip = (page - 1) * limit;

    const filter: any = {};

    if (query.status) filter.status = query.status;
    if (query.lead) filter.lead = query.lead;
    if (query.type) filter.type = query.type;
    if (query.priority) filter.priority = query.priority;

    if (query.dueDateFrom || query.dueDateTo) {
      filter.dueDate = {};
      if (query.dueDateFrom) filter.dueDate.$gte = new Date(query.dueDateFrom);
      if (query.dueDateTo) filter.dueDate.$lte = new Date(query.dueDateTo);
    }

    if (userId) {
      filter.user = userId;
    }

    const [followups, total] = await Promise.all([
      Followup.find(filter)
        .populate("lead", "name email phone course")
        .populate("user", "name email")
        .sort({ dueDate: 1 })
        .skip(skip)
        .limit(limit),
      Followup.countDocuments(filter),
    ]);

    return {
      followups,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getFollowupById(id: string): Promise<IFollowup> {
    const followup = await Followup.findById(id)
      .populate("lead", "name email phone course college")
      .populate("user", "name email");
    if (!followup) throw new AppError("Followup not found", 404);
    return followup;
  }

  async createFollowup(data: Partial<IFollowup>, userId?: string): Promise<IFollowup> {
    const followup = await Followup.create({ ...data, user: userId });
    return followup.populate("lead user");
  }

  async updateFollowup(id: string, data: Partial<IFollowup>): Promise<IFollowup> {
    const updateData: any = { ...data };
    
    if (data.status === "completed" && !data.completedAt) {
      updateData.completedAt = new Date();
    }

    const followup = await Followup.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    })
      .populate("lead", "name email phone")
      .populate("user", "name email");

    if (!followup) throw new AppError("Followup not found", 404);
    return followup;
  }

  async deleteFollowup(id: string): Promise<void> {
    const followup = await Followup.findByIdAndDelete(id);
    if (!followup) throw new AppError("Followup not found", 404);
  }

  async getFollowupStats(userId?: string) {
    const filter: any = userId ? { user: userId } : {};

    const [total, pending, completed, missed, todayReminders] = await Promise.all([
      Followup.countDocuments(filter),
      Followup.countDocuments({ ...filter, status: "pending" }),
      Followup.countDocuments({ ...filter, status: "completed" }),
      Followup.countDocuments({ ...filter, status: "missed" }),
      Followup.countDocuments({
        ...filter,
        status: "pending",
        dueDate: {
          $gte: new Date(new Date().setHours(0, 0, 0, 0)),
          $lte: new Date(new Date().setHours(23, 59, 59, 999)),
        },
      }),
    ]);

    return { total, pending, completed, missed, todayReminders };
  }

  async getUpcomingFollowups(userId: string, days: number = 7) {
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + days);

    return Followup.find({
      user: userId,
      status: "pending",
      dueDate: {
        $gte: new Date(),
        $lte: endDate,
      },
    })
      .populate("lead", "name email phone")
      .sort({ dueDate: 1 })
      .limit(10);
  }
}

export default new FollowupService();