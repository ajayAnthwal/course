"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../../user/model/user.model"));
const appError_1 = __importDefault(require("../../../utils/appError"));
const jwt_1 = require("../../../utils/jwt");
class AuthService {
    async register(input) {
        const existingUser = await user_model_1.default.findOne({ email: input.email });
        if (existingUser) {
            throw new appError_1.default("Email already registered", 400);
        }
        const user = await user_model_1.default.create({
            name: input.name,
            email: input.email,
            password: input.password,
            role: input.role,
            phone: input.phone,
        });
        const token = (0, jwt_1.signToken)({ id: user._id.toString(), role: user.role });
        return { user, token };
    }
    async login(input) {
        const user = await user_model_1.default.findOne({ email: input.email }).select("+password");
        if (!user || !(await user.comparePassword(input.password))) {
            throw new appError_1.default("Invalid email or password", 401);
        }
        if (!user.isActive) {
            throw new appError_1.default("Your account has been deactivated. Please contact support.", 403);
        }
        const token = (0, jwt_1.signToken)({ id: user._id.toString(), role: user.role });
        return { user, token };
    }
    async getMe(userId) {
        const user = await user_model_1.default.findById(userId);
        if (!user)
            throw new appError_1.default("User not found", 404);
        return user;
    }
}
exports.default = new AuthService();
//# sourceMappingURL=auth.service.js.map