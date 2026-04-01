import User from "../../user/model/user.model";
import AppError from "../../../utils/appError";
import { signToken } from "../../../utils/jwt";

interface RegisterInput {
  name: string;
  email: string;
  password: string;
  role: string;
  phone?: string;
}

interface LoginInput {
  email: string;
  password: string;
}

class AuthService {
  async register(input: RegisterInput) {
    const existingUser = await User.findOne({ email: input.email });
    if (existingUser) {
      throw new AppError("Email already registered", 400);
    }

    const user = await User.create({
      name: input.name,
      email: input.email,
      password: input.password,
      role: input.role,
      phone: input.phone,
    });

    const token = signToken({ id: user._id.toString(), role: user.role });

    return { user, token };
  }

  async login(input: LoginInput) {
    const user = await User.findOne({ email: input.email }).select("+password");

    if (!user || !(await user.comparePassword(input.password))) {
      throw new AppError("Invalid email or password", 401);
    }

    if (!user.isActive) {
      throw new AppError("Your account has been deactivated. Please contact support.", 403);
    }

    const token = signToken({ id: user._id.toString(), role: user.role });

    return { user, token };
  }

  async getMe(userId: string) {
    const user = await User.findById(userId);
    if (!user) throw new AppError("User not found", 404);
    return user;
  }
}

export default new AuthService();
