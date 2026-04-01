import { Router } from "express";
import * as userController from "../controller/user.controller";
import { protect, restrictTo } from "../../../middlewares/auth";
import { validate } from "../../../middlewares/validate";
import { updateUserSchema, changePasswordSchema, getUsersQuerySchema } from "../validation/user.validation";

const router = Router();

router.use(protect);

router.get("/me", userController.getMe);
router.patch("/change-password", validate(changePasswordSchema), userController.changePassword);

router.get("/", restrictTo("admin"), validate(getUsersQuerySchema), userController.getAllUsers);
router.get("/:id", restrictTo("admin"), userController.getUserById);
router.patch("/:id", validate(updateUserSchema), userController.updateUser);
router.delete("/:id", restrictTo("admin"), userController.deleteUser);

export default router;
