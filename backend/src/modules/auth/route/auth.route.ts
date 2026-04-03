import { Router } from "express";
import * as authController from "../controller/auth.controller";
import { protect } from "../../../middlewares/auth";
import { validate } from "../../../middlewares/validate";
import { registerSchema, loginSchema, sendOTPSchema, verifyOTPSchema, forgotPasswordSchema, resetPasswordSchema, changePasswordSchema } from "../validation/auth.validation";

const router = Router();

router.post("/register", validate(registerSchema), authController.register);
router.post("/login", validate(loginSchema), authController.login);
router.post("/logout", authController.logout);
router.get("/me", protect, authController.getMe);

router.post("/send-otp", validate(sendOTPSchema), authController.sendOTP);
router.post("/verify-otp", validate(verifyOTPSchema), authController.verifyOTP);
router.post("/forgot-password", validate(forgotPasswordSchema), authController.forgotPassword);
router.post("/reset-password", validate(resetPasswordSchema), authController.resetPassword);
router.post("/change-password", protect, validate(changePasswordSchema), authController.changePassword);

export default router;
