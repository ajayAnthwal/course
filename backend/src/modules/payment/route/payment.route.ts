import { Router } from "express";
import * as paymentController from "../controller/payment.controller";
import { protect, restrictTo } from "../../../middlewares/auth";
import { validate } from "../../../middlewares/validate";
import { createOrderSchema, verifyPaymentSchema, updateOrderSchema } from "../validation/payment.validation";

const router = Router();

router.get("/plans", paymentController.getPlans);

router.use(protect);

router.post("/order", validate(createOrderSchema), paymentController.createOrder);
router.post("/verify", validate(verifyPaymentSchema), paymentController.verifyPayment);
router.get("/orders", paymentController.getMyOrders);
router.get("/orders/:id", paymentController.getOrderById);

router.use(restrictTo("admin"));

router.get("/all", paymentController.getAllOrders);
router.get("/stats", paymentController.getPaymentStats);
router.patch("/orders/:id/status", validate(updateOrderSchema), paymentController.updateOrderStatus);
router.post("/refund", paymentController.processRefund);
router.get("/export", paymentController.exportOrders);

export default router;