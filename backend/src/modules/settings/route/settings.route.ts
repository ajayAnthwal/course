import { Router } from "express";
import * as settingsController from "../controller/settings.controller";
import { protect, restrictTo } from "../../../middlewares/auth";

const router = Router();

router.get("/public", settingsController.getPublicSettings);
router.get("/", settingsController.getAllSettings);
router.get("/:key", settingsController.getSetting);

router.use(protect);
router.use(restrictTo("admin"));

router.post("/", settingsController.setSetting);
router.delete("/:key", settingsController.deleteSetting);

export default router;