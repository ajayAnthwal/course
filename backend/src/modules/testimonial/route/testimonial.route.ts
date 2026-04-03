import { Router } from "express";
import * as testimonialController from "../controller/testimonial.controller";
import { protect, restrictTo } from "../../../middlewares/auth";
import { validate } from "../../../middlewares/validate";
import upload from "../../../middlewares/upload";
import { createTestimonialSchema, updateTestimonialSchema } from "../validation/testimonial.validation";

const router = Router();

router.get("/stats", testimonialController.getTestimonialStats);
router.get("/pending-count", testimonialController.getPendingCount);
router.get("/", testimonialController.getAllTestimonials);
router.get("/:id", testimonialController.getTestimonialById);

router.use(protect);

router.post("/", upload.single("avatar"), validate(createTestimonialSchema), testimonialController.createTestimonial);

router.use(restrictTo("admin"));

router.patch("/:id/approve", testimonialController.approveTestimonial);
router.patch("/:id/reject", testimonialController.rejectTestimonial);
router.patch("/:id/featured", testimonialController.toggleFeatured);
router.patch("/:id", upload.single("avatar"), validate(updateTestimonialSchema), testimonialController.updateTestimonial);
router.delete("/:id", testimonialController.deleteTestimonial);

export default router;