import { Router } from "express";
import * as collegeController from "../controller/college.controller";
import { protect, restrictTo } from "../../../middlewares/auth";
import { validate } from "../../../middlewares/validate";
import {
  createCollegeSchema,
  updateCollegeSchema,
  getCollegesQuerySchema,
} from "../validation/college.validation";

const router = Router();

router.get("/featured", collegeController.getFeaturedColleges);
router.get("/stats", collegeController.getCollegeStats);
router.get("/pending", collegeController.getPendingVerification);
router.get("/slug/:slug", collegeController.getCollegeBySlug);

router.get("/", validate(getCollegesQuerySchema), collegeController.getAllColleges);
router.get("/:id", collegeController.getCollegeById);

router.use(protect);

router.post("/", restrictTo("admin", "college"), validate(createCollegeSchema), collegeController.createCollege);
router.patch("/:id/verify", restrictTo("admin"), collegeController.verifyCollege);
router.patch("/:id/toggle", restrictTo("admin"), collegeController.toggleCollegeActive);
router.patch("/:id", restrictTo("admin", "college"), validate(updateCollegeSchema), collegeController.updateCollege);
router.delete("/:id", restrictTo("admin"), collegeController.deleteCollege);

export default router;