import { Router } from "express";
import * as leadController from "../controller/lead.controller";
import { protect, restrictTo } from "../../../middlewares/auth";
import { validate } from "../../../middlewares/validate";
import {
  createLeadSchema,
  updateLeadSchema,
  getLeadsQuerySchema,
} from "../validation/lead.validation";

const router = Router();

router.use(protect);

router.get("/stats", restrictTo("admin", "college"), leadController.getLeadStats);
router.get("/", validate(getLeadsQuerySchema), leadController.getAllLeads);
router.get("/:id", leadController.getLeadById);
router.post("/", validate(createLeadSchema), leadController.createLead);
router.patch("/:id", restrictTo("admin", "college"), validate(updateLeadSchema), leadController.updateLead);
router.delete("/:id", restrictTo("admin"), leadController.deleteLead);

export default router;
