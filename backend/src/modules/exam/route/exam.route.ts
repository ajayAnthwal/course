import { Router } from "express";
import * as examController from "../controller/exam.controller";
import { protect, restrictTo } from "../../../middlewares/auth";
import { validate } from "../../../middlewares/validate";
import { createExamSchema, updateExamSchema, getExamsQuerySchema } from "../validation/exam.validation";

const router = Router();

router.get("/featured", examController.getFeaturedExams);
router.get("/slug/:slug", examController.getExamBySlug);
router.get("/", validate(getExamsQuerySchema), examController.getAllExams);
router.get("/:id", examController.getExamById);

router.use(protect);
router.post("/", restrictTo("admin"), validate(createExamSchema), examController.createExam);
router.patch("/:id", restrictTo("admin"), validate(updateExamSchema), examController.updateExam);
router.delete("/:id", restrictTo("admin"), examController.deleteExam);

export default router;
