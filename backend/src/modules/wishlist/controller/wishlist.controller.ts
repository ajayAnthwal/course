import { Request, Response, NextFunction } from "express";
import wishlistService from "../service/wishlist.service";
import catchAsync from "../../../utils/catchAsync";

export const getWishlist = catchAsync(async (req: any, res: Response, _next: NextFunction) => {
  const { page, limit } = req.query;
  const result = await wishlistService.getUserWishlist(
    req.user?.id,
    parseInt(page as string || "1", 10),
    parseInt(limit as string || "20", 10)
  );

  res.status(200).json({
    success: true,
    message: "Wishlist retrieved successfully",
    data: result.items,
    pagination: result.pagination,
  });
});

export const addToWishlist = catchAsync(async (req: any, res: Response, _next: NextFunction) => {
  const { collegeId, notes } = req.body;
  const item = await wishlistService.addToWishlist(req.user?.id, collegeId, notes);

  res.status(201).json({
    success: true,
    message: "Added to wishlist",
    data: item,
  });
});

export const removeFromWishlist = catchAsync(async (req: any, res: Response, _next: NextFunction) => {
  const { collegeId } = req.params;
  await wishlistService.removeFromWishlist(req.user?.id, collegeId);

  res.status(200).json({
    success: true,
    message: "Removed from wishlist",
  });
});

export const checkWishlist = catchAsync(async (req: any, res: Response, _next: NextFunction) => {
  const { collegeId } = req.query;
  const isInWishlist = await wishlistService.isInWishlist(req.user?.id, collegeId as string);

  res.status(200).json({
    success: true,
    message: "Wishlist check complete",
    data: { isInWishlist },
  });
});

export const updateWishlistNotes = catchAsync(async (req: any, res: Response, _next: NextFunction) => {
  const { collegeId } = req.params;
  const { notes } = req.body;
  const item = await wishlistService.updateNotes(req.user?.id, collegeId, notes);

  res.status(200).json({
    success: true,
    message: "Notes updated",
    data: item,
  });
});

export const getWishlistStats = catchAsync(async (req: any, res: Response, _next: NextFunction) => {
  const stats = await wishlistService.getWishlistStats(req.user?.id);

  res.status(200).json({
    success: true,
    message: "Wishlist stats retrieved",
    data: stats,
  });
});