import Application, { IApplication } from "../model/application.model";
import College from "../../college/model/college.model";
import AppError from "../../../utils/appError";

class ApplicationService {
  async getUserApplications(userId: string, filters: any = {}, page: number = 1, limit: number = 20) {
    const skip = (page - 1) * limit;
    const filter: any = { user: userId };

    if (filters.status) filter.status = filters.status;
    if (filters.paymentStatus) filter.paymentStatus = filters.paymentStatus;

    const [applications, total] = await Promise.all([
      Application.find(filter)
        .populate("college", "name logo coverImage location type feeStructure", "name")
        .sort({ appliedAt: -1 })
        .skip(skip)
        .limit(limit),
      Application.countDocuments(filter),
    ]);

    return {
      applications,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  async getApplicationById(id: string, userId: string): Promise<IApplication> {
    const application = await Application.findOne({ _id: id, user: userId })
      .populate("college")
      .populate("documents");
    if (!application) throw new AppError("Application not found", 404);
    return application;
  }

  async createApplication(userId: string, data: {
    college: string;
    course: string;
    formData?: Record<string, any>;
    paymentAmount?: number;
  }): Promise<IApplication> {
    const existing = await Application.findOne({ user: userId, college: data.college });
    if (existing) throw new AppError("Already applied to this college", 400);

    const college = await College.findById(data.college);
    if (!college) throw new AppError("College not found", 404);

    const application = await Application.create({
      user: userId,
      college: data.college,
      course: data.course,
      formData: data.formData || {},
      paymentAmount: data.paymentAmount,
      timeline: [{ status: "applied", note: "Application submitted" }],
    });

    return application.populate("college");
  }

  async updateApplication(id: string, userId: string, data: Partial<IApplication>): Promise<IApplication> {
    const application = await Application.findOneAndUpdate(
      { _id: id, user: userId },
      { 
        ...data,
        $push: { timeline: { status: data.status, note: data.notes } }
      },
      { new: true, runValidators: true }
    ).populate("college");

    if (!application) throw new AppError("Application not found", 404);
    return application;
  }

  async updatePaymentStatus(id: string, userId: string, paymentId: string, status: "paid" | "failed"): Promise<IApplication> {
    const existing = await Application.findOne({ _id: id, user: userId });
    if (!existing) throw new AppError("Application not found", 404);
    
    const application = await Application.findOneAndUpdate(
      { _id: id, user: userId },
      {
        paymentId,
        paymentStatus: status,
        status: status === "paid" ? "accepted" : existing.status,
        $push: { 
          timeline: { 
            status: status === "paid" ? "Payment received" : "Payment failed",
            note: `Payment ID: ${paymentId}`
          } 
        },
      },
      { new: true }
    ).populate("college");

    if (!application) throw new AppError("Application not found", 404);
    return application;
  }

  async cancelApplication(id: string, userId: string): Promise<IApplication> {
    const application = await Application.findOneAndUpdate(
      { _id: id, user: userId, status: { $in: ["applied", "under_review"] } },
      { 
        status: "rejected",
        rejectedReason: "Cancelled by user",
        $push: { timeline: { status: "rejected", note: "Cancelled by user" } },
      },
      { new: true }
    ).populate("college");

    if (!application) throw new AppError("Application not found or cannot be cancelled", 404);
    return application;
  }

  async getStats(userId: string) {
    const [total, applied, underReview, shortlisted, accepted, rejected] = await Promise.all([
      Application.countDocuments({ user: userId }),
      Application.countDocuments({ user: userId, status: "applied" }),
      Application.countDocuments({ user: userId, status: "under_review" }),
      Application.countDocuments({ user: userId, status: "shortlisted" }),
      Application.countDocuments({ user: userId, status: "accepted" }),
      Application.countDocuments({ user: userId, status: "rejected" }),
    ]);

    return { total, applied, underReview, shortlisted, accepted, rejected };
  }
}

export default new ApplicationService();