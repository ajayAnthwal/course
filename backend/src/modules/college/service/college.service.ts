import College, { ICollege } from "../model/college.model";
import AppError from "../../../utils/appError";

interface GetCollegesQuery {
  page?: string;
  limit?: string;
  search?: string;
  city?: string;
  state?: string;
  type?: string;
  course?: string;
  minFees?: string;
  maxFees?: string;
  minRating?: string;
  featured?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

class CollegeService {
  async getAllColleges(query: GetCollegesQuery) {
    const page = parseInt(query.page || "1", 10);
    const limit = parseInt(query.limit || "12", 10);
    const skip = (page - 1) * limit;

    const filter: any = { isActive: true };

    if (query.search) {
      filter.$text = { $search: query.search };
    }
    if (query.city) filter["location.city"] = { $regex: query.city, $options: "i" };
    if (query.state) filter["location.state"] = { $regex: query.state, $options: "i" };
    if (query.type) filter.type = query.type;
    if (query.course) filter["courses.name"] = { $regex: query.course, $options: "i" };
    if (query.minRating) filter.rating = { $gte: parseFloat(query.minRating) };
    if (query.featured) filter.featured = query.featured === "true";

    if (query.minFees || query.maxFees) {
      if (query.minFees) filter["courses.fees.min"] = { $gte: parseInt(query.minFees, 10) };
      if (query.maxFees) filter["courses.fees.max"] = { $lte: parseInt(query.maxFees, 10) };
    }

    const sort: any = {};
    if (query.sortBy) {
      sort[query.sortBy] = query.sortOrder === "desc" ? -1 : 1;
    } else {
      sort.featured = -1;
      sort.rating = -1;
    }

    const [colleges, total] = await Promise.all([
      College.find(filter).sort(sort).skip(skip).limit(limit),
      College.countDocuments(filter),
    ]);

    return {
      colleges,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getCollegeById(id: string): Promise<ICollege> {
    const college = await College.findById(id);
    if (!college) throw new AppError("College not found", 404);
    return college;
  }

  async getCollegeBySlug(slug: string): Promise<ICollege> {
    const college = await College.findOne({ slug });
    if (!college) throw new AppError("College not found", 404);
    return college;
  }

  async createCollege(data: Partial<ICollege>): Promise<ICollege> {
    const college = await College.create(data);
    return college;
  }

  async updateCollege(id: string, data: Partial<ICollege>): Promise<ICollege> {
    const college = await College.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    if (!college) throw new AppError("College not found", 404);
    return college;
  }

  async deleteCollege(id: string): Promise<void> {
    const college = await College.findByIdAndDelete(id);
    if (!college) throw new AppError("College not found", 404);
  }

  async getFeaturedColleges(): Promise<ICollege[]> {
    return College.find({ featured: true, isActive: true })
      .sort({ rating: -1 })
      .limit(8);
  }

  async getCollegeStats() {
    const [total, government, privateCount, featured, pending, verified, rejected] = await Promise.all([
      College.countDocuments({ isActive: true }),
      College.countDocuments({ type: "government", isActive: true }),
      College.countDocuments({ type: "private", isActive: true }),
      College.countDocuments({ featured: true, isActive: true }),
      College.countDocuments({ verificationStatus: "pending", isActive: true }),
      College.countDocuments({ verificationStatus: "verified", isActive: true }),
      College.countDocuments({ verificationStatus: "rejected", isActive: true }),
    ]);

    return { total, government, private: privateCount, featured, pending, verified, rejected };
  }

  async verifyCollege(id: string, status: "verified" | "rejected", reason: string | undefined, adminId: string): Promise<ICollege> {
    const updateData: any = {
      verificationStatus: status,
      verified: status === "verified",
      verifiedBy: adminId,
      verifiedAt: new Date(),
    };
    if (status === "rejected" && reason) {
      updateData.rejectionReason = reason;
    }

    const college = await College.findByIdAndUpdate(id, updateData, { new: true });
    if (!college) throw new AppError("College not found", 404);
    return college;
  }

  async toggleActive(id: string): Promise<ICollege> {
    const college = await this.getCollegeById(id);
    const updated = await College.findByIdAndUpdate(
      id,
      { isActive: !college.isActive },
      { new: true }
    );
    if (!updated) throw new AppError("College not found", 404);
    return updated;
  }

  async getPendingVerification(): Promise<ICollege[]> {
    return College.find({ verificationStatus: "pending", isActive: true })
      .sort({ createdAt: -1 });
  }
}

export default new CollegeService();
