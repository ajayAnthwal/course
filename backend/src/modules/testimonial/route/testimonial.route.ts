import { Router } from "express";
import * as testimonialController from "../controller/testimonial.controller";
import { protect, restrictTo } from "../../../middlewares/auth";
import { validate } from "../../../middlewares/validate";
import upload from "../../../middlewares/upload";
import { createTestimonialSchema, updateTestimonialSchema } from "../validation/testimonial.validation";

const router = Router();

router.get("/", testimonialController.getAllTestimonials);
router.get("/:id", testimonialController.getTestimonialById);

router.use(protect);
router.post("/", restrictTo("admin"), upload.single("avatar"), validate(createTestimonialSchema), testimonialController.createTestimonial);
router.patch("/:id", restrictTo("admin"), upload.single("avatar"), validate(updateTestimonialSchema), testimonialController.updateTestimonial);
router.delete("/:id", restrictTo("admin"), testimonialController.deleteTestimonial);

export default router;
