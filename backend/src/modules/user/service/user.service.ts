import User, { IUser } from "../model/user.model";
import AppError from "../../../utils/appError";

interface GetAllUsersQuery {
  page?: string;
  limit?: string;
  role?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

class UserService {
  async getAllUsers(query: GetAllUsersQuery) {
    const page = parseInt(query.page || "1", 10);
    const limit = parseInt(query.limit || "10", 10);
    const skip = (page - 1) * limit;

    const filter: any = {};
    if (query.role) filter.role = query.role;
    if (query.search) {
      filter.$or = [
        { name: { $regex: query.search, $options: "i" } },
        { email: { $regex: query.search, $options: "i" } },
      ];
    }

    const sort: any = {};
    if (query.sortBy) {
      sort[query.sortBy] = query.sortOrder === "desc" ? -1 : 1;
    } else {
      sort.createdAt = -1;
    }

    const [users, total] = await Promise.all([
      User.find(filter).sort(sort).skip(skip).limit(limit),
      User.countDocuments(filter),
    ]);

    return {
      users,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getUserById(id: string): Promise<IUser> {
    const user = await User.findById(id);
    if (!user) throw new AppError("User not found", 404);
    return user;
  }

  async updateUser(id: string, updateData: Partial<IUser>, requestingUserId: string, requestingUserRole: string): Promise<IUser> {
    if (id !== requestingUserId && requestingUserRole !== "admin") {
      throw new AppError("You can only update your own profile", 403);
    }

    const user = await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!user) throw new AppError("User not found", 404);
    return user;
  }

  async deleteUser(id: string): Promise<void> {
    const user = await User.findByIdAndDelete(id);
    if (!user) throw new AppError("User not found", 404);
  }

  async changePassword(id: string, currentPassword: string, newPassword: string): Promise<void> {
    const user = await User.findById(id).select("+password");
    if (!user) throw new AppError("User not found", 404);

    const isCorrect = await user.comparePassword(currentPassword);
    if (!isCorrect) throw new AppError("Current password is incorrect", 401);

    user.password = newPassword;
    await user.save();
  }
}

export default new UserService();
