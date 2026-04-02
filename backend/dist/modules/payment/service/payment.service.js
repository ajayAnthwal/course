"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_model_1 = __importDefault(require("../model/order.model"));
const appError_1 = __importDefault(require("../../../utils/appError"));
const PLAN_PRICES = {
    basic: 99900,
    premium: 499900,
    enterprise: 1999900,
};
const PLAN_DURATION_DAYS = {
    basic: 30,
    premium: 90,
    enterprise: 365,
};
class PaymentService {
    getPlanDetails() {
        return Object.entries(PLAN_PRICES).map(([plan, amount]) => ({
            plan,
            amount,
            currency: "INR",
            amountDisplay: `₹${(amount / 100).toLocaleString("en-IN")}`,
            durationDays: PLAN_DURATION_DAYS[plan],
        }));
    }
    async createOrder(userId, plan, collegeId) {
        if (!PLAN_PRICES[plan]) {
            throw new appError_1.default("Invalid plan type", 400);
        }
        const amount = PLAN_PRICES[plan];
        // In production, call Razorpay API to create order:
        // const razorpay = new Razorpay({ key_id: config.razorpay.keyId, key_secret: config.razorpay.keySecret });
        // const razorpayOrder = await razorpay.orders.create({
        //   amount,
        //   currency: "INR",
        //   receipt: `order_${Date.now()}`,
        //   notes: { userId, plan, collegeId },
        // });
        // Placeholder order ID for structure
        const razorpayOrderId = `order_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
        const order = await order_model_1.default.create({
            user: userId,
            college: collegeId,
            plan,
            amount,
            currency: "INR",
            razorpayOrderId,
            receipt: razorpayOrderId,
            status: "created",
        });
        return order;
    }
    async verifyPayment(razorpayOrderId, razorpayPaymentId, razorpaySignature) {
        // In production, verify signature:
        // const crypto = require("crypto");
        // const expectedSignature = crypto
        //   .createHmac("sha256", config.razorpay.keySecret)
        //   .update(`${razorpayOrderId}|${razorpayPaymentId}`)
        //   .digest("hex");
        // if (expectedSignature !== razorpaySignature) {
        //   throw new AppError("Invalid payment signature", 400);
        // }
        const order = await order_model_1.default.findOneAndUpdate({ razorpayOrderId }, {
            razorpayPaymentId,
            razorpaySignature,
            status: "captured",
        }, { new: true, runValidators: true });
        if (!order)
            throw new appError_1.default("Order not found", 404);
        return order;
    }
    async getOrderById(id) {
        const order = await order_model_1.default.findById(id)
            .populate("user", "name email")
            .populate("college", "name");
        if (!order)
            throw new appError_1.default("Order not found", 404);
        return order;
    }
    async getUserOrders(userId) {
        return order_model_1.default.find({ user: userId })
            .sort({ createdAt: -1 })
            .populate("college", "name");
    }
    async updateOrderStatus(id, status) {
        const order = await order_model_1.default.findByIdAndUpdate(id, { status }, { new: true, runValidators: true });
        if (!order)
            throw new appError_1.default("Order not found", 404);
        return order;
    }
}
exports.default = new PaymentService();
//# sourceMappingURL=payment.service.js.map