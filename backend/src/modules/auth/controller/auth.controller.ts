import { Request, Response, NextFunction } from "express";
import authService from "../service/auth.service";
import catchAsync from "../../../utils/catchAsync";
import config from "../../../config";

const createSendToken = (user: any, token: string, statusCode: number, res: Response): void => {
  const cookieOptions = {
    expires: new Date(
      Date.now() + config.jwt.cookieExpiresIn * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: config.nodeEnv === "production",
    sameSite: "lax" as const,
  };

  res.cookie("jwt", token, cookieOptions);

  res.status(statusCode).json({
    success: true,
    message: statusCode === 201 ? "Registration successful" : "Login successful",
    data: {
      user,
      token,
    },
  });
};

export const register = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const { user, token } = await authService.register(req.body);
  createSendToken(user, token, 201, res);
});

export const login = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const { user, token } = await authService.login(req.body);
  createSendToken(user, token, 200, res);
});

export const logout = catchAsync(async (_req: Request, res: Response, _next: NextFunction) => {
  res.cookie("jwt", "", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});

export const getMe = catchAsync(async (req: any, res: Response, _next: NextFunction) => {
  const user = await authService.getMe(req.user.id);

  res.status(200).json({
    success: true,
    message: "Current user retrieved successfully",
    data: user,
  });
});

export const sendOTP = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const result = await authService.sendOTP(req.body.phone);
  res.status(200).json({ success: true, ...result });
});

export const verifyOTP = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const { user, token, message } = await authService.verifyOTP(req.body.phone, req.body.otp);
  const cookieOptions = {
    expires: new Date(Date.now() + config.jwt.cookieExpiresIn * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: config.nodeEnv === "production",
    sameSite: "lax" as const,
  };
  res.cookie("jwt", token, cookieOptions);
  res.status(200).json({ success: true, message, data: { user, token } });
});

export const forgotPassword = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const result = await authService.forgotPassword(req.body.email);
  res.status(200).json({ success: true, ...result });
});

export const resetPassword = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const result = await authService.resetPassword(req.body.token, req.body.newPassword);
  res.status(200).json({ success: true, ...result });
});

export const changePassword = catchAsync(async (req: any, res: Response, _next: NextFunction) => {
  const result = await authService.changePassword(req.user.id, req.body.currentPassword, req.body.newPassword);
  res.status(200).json({ success: true, ...result });
});
