"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrderById = exports.getMyOrders = exports.verifyPayment = exports.createOrder = exports.getPlans = void 0;
const payment_service_1 = __importDefault(require("../service/payment.service"));
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
exports.getPlans = (0, catchAsync_1.default)(async (_req, res, _next) => {
    const plans = payment_service_1.default.getPlanDetails();
    res.status(200).json({
        success: true,
        message: "Plans retrieved successfully",
        data: plans,
    });
});
exports.createOrder = (0, catchAsync_1.default)(async (req, res, _next) => {
    const order = await payment_service_1.default.createOrder(req.user.id, req.body.plan, req.body.collegeId);
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
exports.verifyPayment = (0, catchAsync_1.default)(async (req, res, _next) => {
    const order = await payment_service_1.default.verifyPayment(req.body.razorpayOrderId, req.body.razorpayPaymentId, req.body.razorpaySignature);
    res.status(200).json({
        success: true,
        message: "Payment verified successfully",
        data: order,
    });
});
exports.getMyOrders = (0, catchAsync_1.default)(async (req, res, _next) => {
    const orders = await payment_service_1.default.getUserOrders(req.user.id);
    res.status(200).json({
        success: true,
        message: "Orders retrieved successfully",
        data: orders,
    });
});
exports.getOrderById = (0, catchAsync_1.default)(async (req, res, _next) => {
    const order = await payment_service_1.default.getOrderById(req.params.id);
    res.status(200).json({
        success: true,
        message: "Order retrieved successfully",
        data: order,
    });
});
//# sourceMappingURL=payment.controller.js.map