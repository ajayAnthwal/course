import { Request, Response, NextFunction } from "express";
import newsService from "../service/news.service";
import catchAsync from "../../../utils/catchAsync";

export const getAllNews = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const result = await newsService.getAllNews(req.query as any);
  res.status(200).json({ success: true, message: "Articles retrieved", data: result.articles, pagination: result.pagination });
});

export const getNewsById = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const article = await newsService.getNewsById(req.params.id);
  res.status(200).json({ success: true, message: "Article retrieved", data: article });
});

export const getNewsBySlug = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const article = await newsService.getNewsBySlug(req.params.slug);
  res.status(200).json({ success: true, message: "Article retrieved", data: article });
});

export const getFeaturedNews = catchAsync(async (_req: Request, res: Response, _next: NextFunction) => {
  const articles = await newsService.getFeaturedNews();
  res.status(200).json({ success: true, message: "Featured articles retrieved", data: articles });
});

export const getLatestNews = catchAsync(async (_req: Request, res: Response, _next: NextFunction) => {
  const articles = await newsService.getLatestNews(6);
  res.status(200).json({ success: true, message: "Latest articles retrieved", data: articles });
});

export const createNews = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const article = await newsService.createNews(req.body);
  res.status(201).json({ success: true, message: "Article created", data: article });
});

export const updateNews = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const article = await newsService.updateNews(req.params.id, req.body);
  res.status(200).json({ success: true, message: "Article updated", data: article });
});

export const deleteNews = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  await newsService.deleteNews(req.params.id);
  res.status(200).json({ success: true, message: "Article deleted" });
});
