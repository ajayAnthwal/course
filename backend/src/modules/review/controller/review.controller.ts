import { Request, Response, NextFunction } from "express";
import reviewService from "../service/review.service";
import catchAsync from "../../../utils/catchAsync";

export const createReview = catchAsync(async (req: any, res: Response, _next: NextFunction) => {
  const review = await reviewService.createReview(req.user?.id, {
    collegeId: req.body.collegeId,
    rating: req.body.rating,
    content: req.body.content,
    pros: req.body.pros,
    cons: req.body.cons,
  });

  res.status(201).json({
    success: true,
    message: "Review submitted for approval",
    data: review,
  });
});

export const getMyReviews = catchAsync(async (req: any, res: Response, _next: NextFunction) => {
  const result = await reviewService.getMyReviews(req.user?.id, req.query);

  res.status(200).json({
    success: true,
    message: "Reviews retrieved successfully",
    data: result.reviews,
    pagination: result.pagination,
  });
});

export const getCollegeReviews = catchAsync(async (req: any, res: Response, _next: NextFunction) => {
  const result = await reviewService.getCollegeReviews(req.params.collegeId, req.query);

  res.status(200).json({
    success: true,
    message: "College reviews retrieved successfully",
    data: result.reviews,
    averageRating: result.averageRating,
    pagination: result.pagination,
  });
});

export const updateReview = catchAsync(async (req: any, res: Response, _next: NextFunction) => {
  const review = await reviewService.updateReview(req.user?.id, req.params.collegeId, {
    rating: req.body.rating,
    content: req.body.content,
    pros: req.body.pros,
    cons: req.body.cons,
  });

  res.status(200).json({
    success: true,
    message: "Review updated",
    data: review,
  });
});

export const deleteReview = catchAsync(async (req: any, res: Response, _next: NextFunction) => {
  await reviewService.deleteReview(req.user?.id, req.params.collegeId);

  res.status(200).json({
    success: true,
    message: "Review deleted",
  });
});

export const markReviewHelpful = catchAsync(async (req: any, res: Response, _next: NextFunction) => {
  await reviewService.markHelpful(req.params.id);

  res.status(200).json({
    success: true,
    message: "Marked as helpful",
  });
});

export const createQuestion = catchAsync(async (req: any, res: Response, _next: NextFunction) => {
  const question = await reviewService.createQuestion(req.user?.id, {
    collegeId: req.body.collegeId,
    question: req.body.question,
  });

  res.status(201).json({
    success: true,
    message: "Question submitted",
    data: question,
  });
});

export const getMyQuestions = catchAsync(async (req: any, res: Response, _next: NextFunction) => {
  const result = await reviewService.getMyQuestions(req.user?.id, req.query);

  res.status(200).json({
    success: true,
    message: "Questions retrieved successfully",
    data: result.questions,
    pagination: result.pagination,
  });
});

export const getCollegeQuestions = catchAsync(async (req: any, res: Response, _next: NextFunction) => {
  const result = await reviewService.getCollegeQuestions(req.params.collegeId, req.query);

  res.status(200).json({
    success: true,
    message: "College questions retrieved successfully",
    data: result.questions,
    pagination: result.pagination,
  });
});

export const answerQuestion = catchAsync(async (req: any, res: Response, _next: NextFunction) => {
  const question = await reviewService.answerQuestion(
    req.params.id,
    req.body.answer,
    req.user?.id
  );

  res.status(200).json({
    success: true,
    message: "Question answered",
    data: question,
  });
});

export const deleteQuestion = catchAsync(async (req: any, res: Response, _next: NextFunction) => {
  await reviewService.deleteQuestion(req.user?.id, req.params.id);

  res.status(200).json({
    success: true,
    message: "Question deleted",
  });
});
