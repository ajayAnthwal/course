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

export const createApplicationFeeOrder = catchAsync(async (req: any, res: Response, _next: NextFunction) => {
  const { applicationId, amount } = req.body;
  const order = await paymentService.createApplicationFeeOrder(
    req.user.id,
    applicationId,
    amount
  );

  res.status(201).json({
    success: true,
    message: "Application fee order created successfully",
    data: {
      orderId: order._id,
      razorpayOrderId: order.razorpayOrderId,
      amount: order.amount,
      currency: order.currency,
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

export const getAllOrders = catchAsync(async (req: any, res: Response, _next: NextFunction) => {
  const { page, limit, status, startDate, endDate, search } = req.query;

  const result = await paymentService.getAllOrders({
    page: page ? parseInt(page as string) : undefined,
    limit: limit ? parseInt(limit as string) : undefined,
    status: status as string,
    startDate: startDate as string,
    endDate: endDate as string,
    search: search as string,
  });

  res.status(200).json({
    success: true,
    message: "Orders retrieved successfully",
    data: result.orders,
    pagination: {
      page: result.page,
      limit: limit ? parseInt(limit as string) : 20,
      total: result.total,
      totalPages: result.totalPages,
    },
  });
});

export const getPaymentStats = catchAsync(async (req: any, res: Response, _next: NextFunction) => {
  const { startDate, endDate } = req.query;

  const stats = await paymentService.getPaymentStats({
    startDate: startDate as string,
    endDate: endDate as string,
  });

  res.status(200).json({
    success: true,
    message: "Payment stats retrieved successfully",
    data: stats,
  });
});

export const updateOrderStatus = catchAsync(async (req: any, res: Response, _next: NextFunction) => {
  const { status } = req.body;
  const order = await paymentService.updateOrderStatus(req.params.id, status);

  res.status(200).json({
    success: true,
    message: "Order status updated successfully",
    data: order,
  });
});

export const processRefund = catchAsync(async (req: any, res: Response, _next: NextFunction) => {
  const { orderId, amount } = req.body;
  const order = await paymentService.processRefund(orderId, amount);

  res.status(200).json({
    success: true,
    message: "Refund processed successfully",
    data: order,
  });
});

export const exportOrders = catchAsync(async (req: any, res: Response, _next: NextFunction) => {
  const { startDate, endDate, status } = req.query;

  const result = await paymentService.getAllOrders({
    startDate: startDate as string,
    endDate: endDate as string,
    status: status as string,
    limit: 1000,
  });

  const csvData = [
    ["Order ID", "User Name", "User Email", "Plan", "Amount", "Currency", "Status", "Created At"].join(","),
    ...result.orders.map(o => [
      o.razorpayOrderId,
      (o.user as any)?.name || "",
      (o.user as any)?.email || "",
      o.plan,
      (o.amount / 100).toFixed(2),
      o.currency,
      o.status,
      new Date(o.createdAt).toISOString(),
    ].join(","))
  ].join("\n");

  res.setHeader("Content-Type", "text/csv");
  res.setHeader("Content-Disposition", "attachment; filename=orders.csv");
  res.send(csvData);
});