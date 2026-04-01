import Lead, { ILead } from "../model/lead.model";
import AppError from "../../../utils/appError";

interface GetLeadsQuery {
  page?: string;
  limit?: string;
  status?: string;
  college?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

class LeadService {
  async getAllLeads(query: GetLeadsQuery, userId?: string, userRole?: string) {
    const page = parseInt(query.page || "1", 10);
    const limit = parseInt(query.limit || "10", 10);
    const skip = (page - 1) * limit;

    const filter: any = {};

    if (userRole === "college") {
      filter.assignedTo = userId;
    } else if (userRole === "student") {
      filter.createdBy = userId;
    }

    if (query.status) filter.status = query.status;
    if (query.college) filter.college = query.college;
    if (query.search) {
      filter.$or = [
        { name: { $regex: query.search, $options: "i" } },
        { email: { $regex: query.search, $options: "i" } },
        { phone: { $regex: query.search, $options: "i" } },
      ];
    }

    const sort: any = {};
    if (query.sortBy) {
      sort[query.sortBy] = query.sortOrder === "desc" ? -1 : 1;
    } else {
      sort.createdAt = -1;
    }

    const [leads, total] = await Promise.all([
      Lead.find(filter)
        .populate("college", "name slug logo")
        .populate("assignedTo", "name email")
        .sort(sort)
        .skip(skip)
        .limit(limit),
      Lead.countDocuments(filter),
    ]);

    return {
      leads,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getLeadById(id: string): Promise<ILead> {
    const lead = await Lead.findById(id)
      .populate("college", "name slug logo")
      .populate("assignedTo", "name email");
    if (!lead) throw new AppError("Lead not found", 404);
    return lead;
  }

  async createLead(data: Partial<ILead>, userId?: string): Promise<ILead> {
    const lead = await Lead.create({ ...data, createdBy: userId });
    return lead.populate("college", "name slug logo");
  }

  async updateLead(id: string, data: Partial<ILead>): Promise<ILead> {
    const lead = await Lead.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    })
      .populate("college", "name slug logo")
      .populate("assignedTo", "name email");

    if (!lead) throw new AppError("Lead not found", 404);
    return lead;
  }

  async deleteLead(id: string): Promise<void> {
    const lead = await Lead.findByIdAndDelete(id);
    if (!lead) throw new AppError("Lead not found", 404);
  }

  async getLeadStats() {
    const [total, newLeads, contacted, interested, admitted] = await Promise.all([
      Lead.countDocuments(),
      Lead.countDocuments({ status: "new" }),
      Lead.countDocuments({ status: "contacted" }),
      Lead.countDocuments({ status: "interested" }),
      Lead.countDocuments({ status: "admitted" }),
    ]);

    return { total, new: newLeads, contacted, interested, admitted };
  }
}

export default new LeadService();
