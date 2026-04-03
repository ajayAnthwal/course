import express from "express";
import { getAllActivityLogs, getActivityStats, clearOldLogs } from "../controller/activity-log.controller";
import { authenticate, authorize } from "../../../middlewares/auth";

const router = express.Router();

router.use(authenticate);
router.use(authorize(["admin"]));

router.get("/", getAllActivityLogs);
router.get("/stats", getActivityStats);
router.delete("/clear", clearOldLogs);

export default router;