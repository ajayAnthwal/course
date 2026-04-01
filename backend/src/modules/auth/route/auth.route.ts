import { Router } from "express";
import * as authController from "../controller/auth.controller";
import { protect } from "../../../middlewares/auth";
import { validate } from "../../../middlewares/validate";
import { registerSchema, loginSchema } from "../validation/auth.validation";

const router = Router();

router.post("/register", validate(registerSchema), authController.register);
router.post("/login", validate(loginSchema), authController.login);
router.post("/logout", authController.logout);
router.get("/me", protect, authController.getMe);

export default router;
