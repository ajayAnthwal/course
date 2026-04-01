import { Response, NextFunction } from "express";
import userService from "../service/user.service";
import catchAsync from "../../../utils/catchAsync";

export const getAllUsers = catchAsync(async (req: any, res: Response, _next: NextFunction) => {
  const result = await userService.getAllUsers(req.query);

  res.status(200).json({
    success: true,
    message: "Users retrieved successfully",
    data: result.users,
    pagination: result.pagination,
  });
});

export const getUserById = catchAsync(async (req: any, res: Response, _next: NextFunction) => {
  const user = await userService.getUserById(req.params.id);

  res.status(200).json({
    success: true,
    message: "User retrieved successfully",
    data: user,
  });
});

export const updateUser = catchAsync(async (req: any, res: Response, _next: NextFunction) => {
  const user = await userService.updateUser(
    req.params.id,
    req.body,
    req.user.id,
    req.user.role
  );

  res.status(200).json({
    success: true,
    message: "User updated successfully",
    data: user,
  });
});

export const deleteUser = catchAsync(async (req: any, res: Response, _next: NextFunction) => {
  await userService.deleteUser(req.params.id);

  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
});

export const changePassword = catchAsync(async (req: any, res: Response, _next: NextFunction) => {
  await userService.changePassword(
    req.user.id,
    req.body.currentPassword,
    req.body.newPassword
  );

  res.status(200).json({
    success: true,
    message: "Password changed successfully",
  });
});

export const getMe = catchAsync(async (req: any, res: Response, _next: NextFunction) => {
  const user = await userService.getUserById(req.user.id);

  res.status(200).json({
    success: true,
    message: "Current user retrieved successfully",
    data: user,
  });
});
