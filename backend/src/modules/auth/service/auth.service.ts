import User from "../../user/model/user.model";
import AppError from "../../../utils/appError";
import { signToken } from "../../../utils/jwt";
import smsService from "../../../services/sms/sms.service";

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

const OTP_EXPIRY = 10 * 60 * 1000;
const generatedOTPs = new Map<string, { otp: string; expires: number }>();
const passwordResetTokens = new Map<string, { userId: string; expires: number }>();

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

  async sendOTP(phone: string) {
    const user = await User.findOne({ phone });
    if (!user) throw new AppError("No account found with this phone number", 404);

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    generatedOTPs.set(phone, { otp, expires: Date.now() + OTP_EXPIRY });

    await smsService.sendOTP(phone, otp);

    return { message: "OTP sent successfully" };
  }

  async verifyOTP(phone: string, otp: string) {
    const record = generatedOTPs.get(phone);
    if (!record) throw new AppError("OTP not sent or expired", 400);

    if (Date.now() > record.expires) {
      generatedOTPs.delete(phone);
      throw new AppError("OTP expired", 400);
    }

    if (record.otp !== otp) {
      throw new AppError("Invalid OTP", 400);
    }

    generatedOTPs.delete(phone);
    const user = await User.findOne({ phone });
    if (!user) throw new AppError("User not found", 404);

    const token = signToken({ id: user._id.toString(), role: user.role, verified: true });
    return { user, token, message: "OTP verified successfully" };
  }

  async forgotPassword(email: string) {
    const user = await User.findOne({ email });
    if (!user) throw new AppError("No account found with this email", 404);

    const resetToken = Math.random().toString(36).substring(2, 15);
    passwordResetTokens.set(resetToken, { userId: user._id.toString(), expires: Date.now() + 3600000 });

    return { message: "Password reset link sent to your email", token: resetToken };
  }

  async resetPassword(token: string, newPassword: string) {
    const record = passwordResetTokens.get(token);
    if (!record) throw new AppError("Invalid or expired reset token", 400);

    if (Date.now() > record.expires) {
      passwordResetTokens.delete(token);
      throw new AppError("Reset token expired", 400);
    }

    const user = await User.findById(record.userId);
    if (!user) throw new AppError("User not found", 404);

    user.password = newPassword;
    await user.save();

    passwordResetTokens.delete(token);
    return { message: "Password reset successfully" };
  }

  async changePassword(userId: string, currentPassword: string, newPassword: string) {
    const user = await User.findById(userId).select("+password");
    if (!user) throw new AppError("User not found", 404);

    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) throw new AppError("Current password is incorrect", 400);

    user.password = newPassword;
    await user.save();

    return { message: "Password changed successfully" };
  }
}

export default new AuthService();
