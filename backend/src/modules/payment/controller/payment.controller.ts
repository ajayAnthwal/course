import { Response, NextFunction } from "express";
import paymentService from "../service/payment.service";
import catchAsync from "../../../utils/catchAsync";

export const getPlans = catchAsync(async (_req: any, res: Response, _next: NextFunction) => {
  const plans = paymentService.getPlanDetails();

  res.status(200).json({
    success: true,
    message: "Plans retrieved successfully",
    data: plans,
  });
});

export const createOrder = catchAsync(async (req: any, res: Response, _next: NextFunction) => {
  const order = await paymentService.createOrder(
    req.user.id,
    req.body.plan,
    req.body.collegeId
  );

  res.status(201).json({
    success: true,
    message: "Order created successfully",
    data: {
      orderId: order._id,
      razorpayOrderId: order.razorpayOrderId,
      amount: order.amount,
      currency: order.currency,
      plan: order.plan,
    },
  });
});

export const verifyPayment = catchAsync(async (req: any, res: Response, _next: NextFunction) => {
  const order = await paymentService.verifyPayment(
    req.body.razorpayOrderId,
    req.body.razorpayPaymentId,
    req.body.razorpaySignature
  );

  res.status(200).json({
    success: true,
    message: "Payment verified successfully",
    data: order,
  });
});

export const getMyOrders = catchAsync(async (req: any, res: Response, _next: NextFunction) => {
  const orders = await paymentService.getUserOrders(req.user.id);

  res.status(200).json({
    success: true,
    message: "Orders retrieved successfully",
    data: orders,
  });
});

export const getOrderById = catchAsync(async (req: any, res: Response, _next: NextFunction) => {
  const order = await paymentService.getOrderById(req.params.id);

  res.status(200).json({
    success: true,
    message: "Order retrieved successfully",
    data: order,
  });
});
