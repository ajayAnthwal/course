import Wishlist, { IWishlist } from "../model/wishlist.model";
import College from "../../college/model/college.model";
import AppError from "../../../utils/appError";

class WishlistService {
  async getUserWishlist(userId: string, page: number = 1, limit: number = 20) {
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      Wishlist.find({ user: userId })
        .populate("college", "name logo coverImage location.rating location.city type")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Wishlist.countDocuments({ user: userId }),
    ]);

    return {
      items,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  async addToWishlist(userId: string, collegeId: string, notes?: string): Promise<IWishlist> {
    const existing = await Wishlist.findOne({ user: userId, college: collegeId });
    if (existing) throw new AppError("College already in wishlist", 400);

    const college = await College.findById(collegeId);
    if (!college) throw new AppError("College not found", 404);

    const item = await Wishlist.create({
      user: userId,
      college: collegeId,
      notes,
    });
    return item.populate("college");
  }

  async removeFromWishlist(userId: string, collegeId: string): Promise<void> {
    const result = await Wishlist.findOneAndDelete({
      user: userId,
      college: collegeId,
    });
    if (!result) throw new AppError("Item not found in wishlist", 404);
  }

  async isInWishlist(userId: string, collegeId: string): Promise<boolean> {
    const item = await Wishlist.findOne({ user: userId, college: collegeId });
    return !!item;
  }

  async updateNotes(userId: string, collegeId: string, notes: string): Promise<IWishlist> {
    const item = await Wishlist.findOneAndUpdate(
      { user: userId, college: collegeId },
      { notes },
      { new: true }
    ).populate("college");
    if (!item) throw new AppError("Item not found in wishlist", 404);
    return item;
  }

  async getWishlistStats(userId: string) {
    const total = await Wishlist.countDocuments({ user: userId });
    
    const colleges = await Wishlist.find({ user: userId }).populate("college");
    const totalColleges = colleges.length;
    
    return { total, totalColleges };
  }
}

export default new WishlistService();