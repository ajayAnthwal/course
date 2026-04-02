import { Request, Response, NextFunction } from "express";
import categoryService from "../service/category.service";
import catchAsync from "../../../utils/catchAsync";

export const getAllCategories = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const result = await categoryService.getAll(req.query as any);
  res.status(200).json({ success: true, message: "Categories retrieved", data: result.categories, pagination: result.pagination });
});

export const getCategoryById = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const category = await categoryService.getById(req.params.id as string);
  res.status(200).json({ success: true, message: "Category retrieved", data: category });
});

export const createCategory = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const data: any = { ...req.body };
  if (req.file) data.image = `/uploads/${req.file.filename}`;
  const category = await categoryService.create(data);
  res.status(201).json({ success: true, message: "Category created", data: category });
});

export const updateCategory = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const data: any = { ...req.body };
  if (req.file) data.image = `/uploads/${req.file.filename}`;
  const category = await categoryService.update(req.params.id as string, data);
  res.status(200).json({ success: true, message: "Category updated", data: category });
});

export const deleteCategory = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  await categoryService.delete(req.params.id as string);
  res.status(200).json({ success: true, message: "Category deleted" });
});
