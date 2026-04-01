import Order, { IOrder, PlanType, PaymentStatus } from "../model/order.model";
import config from "../../../config";
import AppError from "../../../utils/appError";

const PLAN_PRICES: Record<PlanType, number> = {
  basic: 99900,
  premium: 499900,
  enterprise: 1999900,
};

const PLAN_DURATION_DAYS: Record<PlanType, number> = {
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
      durationDays: PLAN_DURATION_DAYS[plan as PlanType],
    }));
  }

  async createOrder(userId: string, plan: PlanType, collegeId?: string): Promise<IOrder> {
    if (!PLAN_PRICES[plan]) {
      throw new AppError("Invalid plan type", 400);
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

    const order = await Order.create({
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

  async verifyPayment(
    razorpayOrderId: string,
    razorpayPaymentId: string,
    razorpaySignature: string
  ): Promise<IOrder> {
    // In production, verify signature:
    // const crypto = require("crypto");
    // const expectedSignature = crypto
    //   .createHmac("sha256", config.razorpay.keySecret)
    //   .update(`${razorpayOrderId}|${razorpayPaymentId}`)
    //   .digest("hex");
    // if (expectedSignature !== razorpaySignature) {
    //   throw new AppError("Invalid payment signature", 400);
    // }

    const order = await Order.findOneAndUpdate(
      { razorpayOrderId },
      {
        razorpayPaymentId,
        razorpaySignature,
        status: "captured",
      },
      { new: true, runValidators: true }
    );

    if (!order) throw new AppError("Order not found", 404);
    return order;
  }

  async getOrderById(id: string): Promise<IOrder> {
    const order = await Order.findById(id)
      .populate("user", "name email")
      .populate("college", "name");
    if (!order) throw new AppError("Order not found", 404);
    return order;
  }

  async getUserOrders(userId: string): Promise<IOrder[]> {
    return Order.find({ user: userId })
      .sort({ createdAt: -1 })
      .populate("college", "name");
  }

  async updateOrderStatus(id: string, status: PaymentStatus): Promise<IOrder> {
    const order = await Order.findByIdAndUpdate(id, { status }, { new: true, runValidators: true });
    if (!order) throw new AppError("Order not found", 404);
    return order;
  }
}

export default new PaymentService();
