import { Response, NextFunction } from "express";
import roleService from "../service/role.service";
import catchAsync from "../../../utils/catchAsync";

export const getAllRoles = catchAsync(async (_req: any, res: Response, _next: NextFunction) => {
  const roles = await roleService.getAllRoles();

  res.status(200).json({
    success: true,
    message: "Roles retrieved successfully",
    data: roles,
  });
});

export const getRoleById = catchAsync(async (req: any, res: Response, _next: NextFunction) => {
  const role = await roleService.getRoleById(req.params.id);

  res.status(200).json({
    success: true,
    message: "Role retrieved successfully",
    data: role,
  });
});

export const createRole = catchAsync(async (req: any, res: Response, _next: NextFunction) => {
  const role = await roleService.createRole(req.body);

  res.status(201).json({
    success: true,
    message: "Role created successfully",
    data: role,
  });
});

export const updateRole = catchAsync(async (req: any, res: Response, _next: NextFunction) => {
  const role = await roleService.updateRole(req.params.id, req.body);

  res.status(200).json({
    success: true,
    message: "Role updated successfully",
    data: role,
  });
});

export const deleteRole = catchAsync(async (req: any, res: Response, _next: NextFunction) => {
  await roleService.deleteRole(req.params.id);

  res.status(200).json({
    success: true,
    message: "Role deleted successfully",
  });
});