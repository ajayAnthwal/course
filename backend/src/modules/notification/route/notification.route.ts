import { Router } from "express";
import * as notificationController from "../controller/notification.controller";
import { protect, restrictTo } from "../../../middlewares/auth";

const router = Router();

router.use(protect);
router.use(restrictTo("admin"));

router.post("/send", notificationController.sendNotification);
router.post("/bulk", notificationController.sendBulkNotification);
router.get("/all", notificationController.getAllNotifications);
router.get("/templates", notificationController.getTemplates);
router.patch("/:id/read", notificationController.markAsRead);

router.get("/my", notificationController.getMyNotifications);

export default router;