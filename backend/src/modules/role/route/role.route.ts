import { Router } from "express";
import * as roleController from "../controller/role.controller";
import { protect, restrictTo } from "../../../middlewares/auth";

const router = Router();

router.use(protect);
router.use(restrictTo("admin"));

router.get("/", roleController.getAllRoles);
router.get("/:id", roleController.getRoleById);
router.post("/", roleController.createRole);
router.patch("/:id", roleController.updateRole);
router.delete("/:id", roleController.deleteRole);

export default router;