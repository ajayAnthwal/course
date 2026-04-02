"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../model/user.model"));
const appError_1 = __importDefault(require("../../../utils/appError"));
class UserService {
    async getAllUsers(query) {
        const page = parseInt(query.page || "1", 10);
        const limit = parseInt(query.limit || "10", 10);
        const skip = (page - 1) * limit;
        const filter = {};
        if (query.role)
            filter.role = query.role;
        if (query.search) {
            filter.$or = [
                { name: { $regex: query.search, $options: "i" } },
                { email: { $regex: query.search, $options: "i" } },
            ];
        }
        const sort = {};
        if (query.sortBy) {
            sort[query.sortBy] = query.sortOrder === "desc" ? -1 : 1;
        }
        else {
            sort.createdAt = -1;
        }
        const [users, total] = await Promise.all([
            user_model_1.default.find(filter).sort(sort).skip(skip).limit(limit),
            user_model_1.default.countDocuments(filter),
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
    async getUserById(id) {
        const user = await user_model_1.default.findById(id);
        if (!user)
            throw new appError_1.default("User not found", 404);
        return user;
    }
    async updateUser(id, updateData, requestingUserId, requestingUserRole) {
        if (id !== requestingUserId && requestingUserRole !== "admin") {
            throw new appError_1.default("You can only update your own profile", 403);
        }
        const user = await user_model_1.default.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
        });
        if (!user)
            throw new appError_1.default("User not found", 404);
        return user;
    }
    async deleteUser(id) {
        const user = await user_model_1.default.findByIdAndDelete(id);
        if (!user)
            throw new appError_1.default("User not found", 404);
    }
    async changePassword(id, currentPassword, newPassword) {
        const user = await user_model_1.default.findById(id).select("+password");
        if (!user)
            throw new appError_1.default("User not found", 404);
        const isCorrect = await user.comparePassword(currentPassword);
        if (!isCorrect)
            throw new appError_1.default("Current password is incorrect", 401);
        user.password = newPassword;
        await user.save();
    }
}
exports.default = new UserService();
//# sourceMappingURL=user.service.js.map