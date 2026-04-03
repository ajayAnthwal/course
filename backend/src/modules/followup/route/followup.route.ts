import express from "express";
import {
  getAllFollowups,
  getFollowupById,
  createFollowup,
  updateFollowup,
  deleteFollowup,
  getFollowupStats,
  getUpcomingFollowups,
} from "../controller/followup.controller";
import { authenticate, authorize } from "../../../middlewares/auth";
import validate from "../../../middlewares/validate";
import { followupValidation } from "../validation/followup.validation";

const router = express.Router();

router.use(authenticate);

router.get("/stats", getFollowupStats);
router.get("/upcoming", getUpcomingFollowups);
router.get("/", getAllFollowups);
router.get("/:id", getFollowupById);
router.post("/", validate(followupValidation), createFollowup);
router.patch("/:id", updateFollowup);
router.delete("/:id", deleteFollowup);

export default router;