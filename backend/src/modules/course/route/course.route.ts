import { Router } from "express";
import * as courseController from "../controller/course.controller";
import { protect, restrictTo } from "../../../middlewares/auth";
import { validate } from "../../../middlewares/validate";
import { createCourseSchema, updateCourseSchema, getCoursesQuerySchema } from "../validation/course.validation";

const router = Router();

router.get("/featured", courseController.getFeaturedCourses);
router.get("/stats", courseController.getCourseStats);
router.get("/slug/:slug", courseController.getCourseBySlug);
router.get("/", validate(getCoursesQuerySchema), courseController.getAllCourses);
router.get("/:id", courseController.getCourseById);

router.use(protect);
router.post("/", restrictTo("admin"), validate(createCourseSchema), courseController.createCourse);
router.patch("/:id", restrictTo("admin"), validate(updateCourseSchema), courseController.updateCourse);
router.delete("/:id", restrictTo("admin"), courseController.deleteCourse);

export default router;
