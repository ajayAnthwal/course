import { Request, Response, NextFunction } from "express";
import blogService from "../service/blog.service";
import catchAsync from "../../../utils/catchAsync";

export const getAllBlogs = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const result = await blogService.getAll(req.query as any);
  res.status(200).json({ success: true, message: "Blogs retrieved", data: result.blogs, pagination: result.pagination });
});

export const getBlogById = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const blog = await blogService.getById(req.params.id as string);
  res.status(200).json({ success: true, message: "Blog retrieved", data: blog });
});

export const getBlogBySlug = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const blog = await blogService.getBySlug(req.params.slug as string);
  res.status(200).json({ success: true, message: "Blog retrieved", data: blog });
});

export const getFeaturedBlogs = catchAsync(async (_req: Request, res: Response, _next: NextFunction) => {
  const blogs = await blogService.getFeatured();
  res.status(200).json({ success: true, message: "Featured blogs retrieved", data: blogs });
});

export const getLatestBlogs = catchAsync(async (_req: Request, res: Response, _next: NextFunction) => {
  const blogs = await blogService.getLatest(6);
  res.status(200).json({ success: true, message: "Latest blogs retrieved", data: blogs });
});

export const createBlog = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const data: any = { ...req.body };
  if (req.file) data.image = `/uploads/${req.file.filename}`;
  const blog = await blogService.create(data);
  res.status(201).json({ success: true, message: "Blog created", data: blog });
});

export const updateBlog = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const data: any = { ...req.body };
  if (req.file) data.image = `/uploads/${req.file.filename}`;
  const blog = await blogService.update(req.params.id as string, data);
  res.status(200).json({ success: true, message: "Blog updated", data: blog });
});

export const deleteBlog = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  await blogService.delete(req.params.id as string);
  res.status(200).json({ success: true, message: "Blog deleted" });
});
