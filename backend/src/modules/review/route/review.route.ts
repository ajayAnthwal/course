import express from "express";
import {
  createReview,
  getMyReviews,
  getCollegeReviews,
  updateReview,
  deleteReview,
  markReviewHelpful,
  createQuestion,
  getMyQuestions,
  getCollegeQuestions,
  answerQuestion,
  deleteQuestion,
} from "../controller/review.controller";
import { authenticate, authorize } from "../../../middlewares/auth";

const router = express.Router();

router.use(authenticate);

router.post("/reviews", createReview);
router.get("/reviews/my", getMyReviews);
router.put("/reviews/:collegeId", updateReview);
router.delete("/reviews/:collegeId", deleteReview);
router.post("/reviews/:id/helpful", markReviewHelpful);

router.post("/questions", createQuestion);
router.get("/questions/my", getMyQuestions);
router.delete("/questions/:id", deleteQuestion);

router.get("/college/:collegeId/reviews", getCollegeReviews);
router.get("/college/:collegeId/questions", getCollegeQuestions);
router.put("/questions/:id/answer", authorize(["admin", "college"]), answerQuestion);

export default router;
