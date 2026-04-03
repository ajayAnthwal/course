import Testimonial, { ITestimonial } from "../model/testimonial.model";
import AppError from "../../../utils/appError";

interface GetTestimonialsQuery {
  page?: string;
  limit?: string;
  status?: string;
  college?: string;
  search?: string;
}

class TestimonialService {
  async getAll(query: GetTestimonialsQuery) {
    const page = parseInt(query.page || "1", 10);
    const limit = parseInt(query.limit || "20", 10);
    const skip = (page - 1) * limit;

    const filter: any = {};

    if (query.status && query.status !== "all") {
      filter.status = query.status;
    } else {
      filter.isActive = true;
      filter.status = "approved";
    }

    if (query.college) filter.college = query.college;
    if (query.search) {
      filter.$or = [
        { name: { $regex: query.search, $options: "i" } },
        { content: { $regex: query.search, $options: "i" } },
      ];
    }

    const [testimonials, total] = await Promise.all([
      Testimonial.find(filter)
        .populate("user", "name email")
        .populate("approvedBy", "name")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Testimonial.countDocuments(filter),
    ]);

    return { testimonials, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } };
  }

  async getById(id: string): Promise<ITestimonial> {
    const testimonial = await Testimonial.findById(id)
      .populate("user", "name email")
      .populate("approvedBy", "name");
    if (!testimonial) throw new AppError("Testimonial not found", 404);
    return testimonial;
  }

  async create(data: Partial<ITestimonial>): Promise<ITestimonial> {
    return Testimonial.create({ ...data, status: "pending" });
  }

  async update(id: string, data: Partial<ITestimonial>): Promise<ITestimimonial> {
    const testimonial = await Testimonial.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    if (!testimonial) throw new AppError("Testimonial not found", 404);
    return testimonial;
  }

  async delete(id: string): Promise<void> {
    const testimonial = await Testimonial.findByIdAndDelete(id);
    if (!testimonial) throw new AppError("Testimonial not found", 404);
  }

  async approve(id: string, adminId: string): Promise<ITestimonial> {
    const testimonial = await Testimonial.findByIdAndUpdate(
      id,
      {
        status: "approved",
        approvedBy: adminId,
        approvedAt: new Date(),
        isActive: true,
      },
      { new: true }
    );
    if (!testimonial) throw new AppError("Testimonial not found", 404);
    return testimonial;
  }

  async reject(id: string, reason: string): Promise<ITestimimonial> {
    const testimonial = await Testimonial.findByIdAndUpdate(
      id,
      {
        status: "rejected",
        rejectionReason: reason,
        isActive: false,
      },
      { new: true }
    );
    if (!testimonial) throw new AppError("Testimonial not found", 404);
    return testimonial;
  }

  async toggleFeatured(id: string): Promise<ITestimimonial> {
    const testimonial = await this.getById(id);
    const updated = await Testimonial.findByIdAndUpdate(
      id,
      { isFeatured: !testimonial.isFeatured },
      { new: true }
    );
    if (!updated) throw new AppError("Testimonial not found", 404);
    return updated;
  }

  async getStats() {
    const [total, pending, approved, rejected] = await Promise.all([
      Testimonial.countDocuments(),
      Testimonial.countDocuments({ status: "pending" }),
      Testimonial.countDocuments({ status: "approved" }),
      Testimonial.countDocuments({ status: "rejected" }),
    ]);

    const avgRating = await Testimonial.aggregate([
      { $match: { status: "approved" } },
      { $group: { _id: null, avg: { $avg: "$rating" } } },
    ]);

    return {
      total,
      pending,
      approved,
      rejected,
      averageRating: avgRating[0]?.avg?.toFixed(1) || 0,
    };
  }

  async getPendingCount(): Promise<number> {
    return Testimonial.countDocuments({ status: "pending" });
  }
}

export default new TestimonialService();