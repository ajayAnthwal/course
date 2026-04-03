import { Review, Question, IReview, IQuestion } from "../model/review.model";
import AppError from "../../../utils/appError";
import mongoose from "mongoose";

interface ReviewQuery {
  page?: string;
  limit?: string;
  collegeId?: string;
  status?: string;
  sortBy?: string;
  sortOrder?: string;
}

interface QuestionQuery {
  page?: string;
  limit?: string;
  collegeId?: string;
  status?: string;
}

class ReviewService {
  async createReview(userId: string, data: {
    collegeId: string;
    rating: number;
    content: string;
    pros?: string;
    cons?: string;
  }): Promise<IReview> {
    const existing = await Review.findOne({
      user: userId,
      college: data.collegeId,
    });
    if (existing) {
      throw new AppError("You have already reviewed this college", 400);
    }

    const review = await Review.create({
      user: userId,
      college: data.collegeId,
      rating: data.rating,
      content: data.content,
      pros: data.pros,
      cons: data.cons,
      status: "pending",
    });

    return review.populate("college");
  }

  async getMyReviews(userId: string, query: ReviewQuery) {
    const page = parseInt(query.page || "1", 10);
    const limit = parseInt(query.limit || "10", 10);
    const skip = (page - 1) * limit;

    const filter: any = { user: userId };
    if (query.status) filter.status = query.status;

    const [reviews, total] = await Promise.all([
      Review.find(filter)
        .populate("college", "name location.city")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Review.countDocuments(filter),
    ]);

    return {
      reviews,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getCollegeReviews(collegeId: string, query: ReviewQuery) {
    const page = parseInt(query.page || "1", 10);
    const limit = parseInt(query.limit || "10", 10);
    const skip = (page - 1) * limit;

    const filter: any = { college: collegeId, status: "approved" };
    if (query.sortBy) {
      const sort: any = {};
      sort[query.sortBy] = query.sortOrder === "desc" ? -1 : 1;
    }

    const [reviews, total] = await Promise.all([
      Review.find(filter)
        .populate("user", "name")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Review.countDocuments(filter),
    ]);

    const avgRating = await Review.aggregate([
      { $match: { college: new mongoose.Types.ObjectId(collegeId), status: "approved" } },
      { $group: { _id: null, avgRating: { $avg: "$rating" } } },
    ]);

    return {
      reviews,
      averageRating: avgRating[0]?.avgRating || 0,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async updateReview(userId: string, collegeId: string, data: {
    rating?: number;
    content?: string;
    pros?: string;
    cons?: string;
  }): Promise<IReview> {
    const review = await Review.findOneAndUpdate(
      { user: userId, college: collegeId },
      { ...data, status: "pending" },
      { new: true }
    ).populate("college");

    if (!review) throw new AppError("Review not found", 404);
    return review;
  }

  async deleteReview(userId: string, collegeId: string): Promise<void> {
    const result = await Review.deleteOne({ user: userId, college: collegeId });
    if (!result.deletedCount) throw new AppError("Review not found", 404);
  }

  async markHelpful(reviewId: string): Promise<void> {
    await Review.findByIdAndUpdate(reviewId, { $inc: { helpfulCount: 1 } });
  }

  async createQuestion(userId: string, data: {
    collegeId: string;
    question: string;
  }): Promise<IQuestion> {
    const question = await Question.create({
      user: userId,
      college: data.collegeId,
      question: data.question,
      status: "pending",
    });

    return question.populate("college");
  }

  async getMyQuestions(userId: string, query: QuestionQuery) {
    const page = parseInt(query.page || "1", 10);
    const limit = parseInt(query.limit || "10", 10);
    const skip = (page - 1) * limit;

    const filter: any = { user: userId };
    if (query.status) filter.status = query.status;

    const [questions, total] = await Promise.all([
      Question.find(filter)
        .populate("college", "name location.city")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Question.countDocuments(filter),
    ]);

    return {
      questions,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getCollegeQuestions(collegeId: string, query: QuestionQuery) {
    const page = parseInt(query.page || "1", 10);
    const limit = parseInt(query.limit || "10", 10);
    const skip = (page - 1) * limit;

    const filter: any = { college: collegeId, status: "answered" };

    const [questions, total] = await Promise.all([
      Question.find(filter)
        .populate("user", "name")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Question.countDocuments(filter),
    ]);

    return {
      questions,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async answerQuestion(
    questionId: string,
    answer: string,
    answeredBy: string
  ): Promise<IQuestion> {
    const question = await Question.findByIdAndUpdate(
      questionId,
      {
        answer,
        answeredBy,
        answeredAt: new Date(),
        status: "answered",
      },
      { new: true }
    ).populate("college");

    if (!question) throw new AppError("Question not found", 404);
    return question;
  }

  async deleteQuestion(userId: string, questionId: string): Promise<void> {
    const result = await Question.deleteOne({
      _id: questionId,
      user: userId,
    });
    if (!result.deletedCount) throw new AppError("Question not found", 404);
  }
}

export default new ReviewService();
