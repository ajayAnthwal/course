import { Router } from "express";
import * as paymentController from "../controller/payment.controller";
import { protect } from "../../../middlewares/auth";
import { validate } from "../../../middlewares/validate";
import { createOrderSchema, verifyPaymentSchema } from "../validation/payment.validation";

const router = Router();

router.get("/plans", paymentController.getPlans);

router.use(protect);

router.post("/order", validate(createOrderSchema), paymentController.createOrder);
router.post("/verify", validate(verifyPaymentSchema), paymentController.verifyPayment);
router.get("/orders", paymentController.getMyOrders);
router.get("/orders/:id", paymentController.getOrderById);

export default router;
