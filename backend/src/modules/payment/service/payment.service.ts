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

  async getAllOrders(filters: {
    status?: string;
    startDate?: string;
    endDate?: string;
    page?: number;
    limit?: number;
    search?: string;
  }): Promise<{ orders: IOrder[]; total: number; page: number; totalPages: number }> {
    const query: any = {};
    
    if (filters.status && filters.status !== "all") {
      query.status = filters.status;
    }
    
    if (filters.startDate || filters.endDate) {
      query.createdAt = {};
      if (filters.startDate) query.createdAt.$gte = new Date(filters.startDate);
      if (filters.endDate) query.createdAt.$lte = new Date(filters.endDate);
    }

    if (filters.search) {
      const searchRegex = new RegExp(filters.search, "i");
      query.$or = [
        { "user.name": searchRegex },
        { "user.email": searchRegex },
        { razorpayOrderId: searchRegex },
      ];
    }

    const page = filters.page || 1;
    const limit = filters.limit || 20;
    const skip = (page - 1) * limit;

    const orders = await Order.find(query)
      .populate("user", "name email role")
      .populate("college", "name")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Order.countDocuments(query);

    return {
      orders,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getPaymentStats(filters: { startDate?: string; endDate?: string }): Promise<{
    totalRevenue: number;
    totalOrders: number;
    successfulPayments: number;
    pendingPayments: number;
    failedPayments: number;
    monthlyRevenue: { month: string; revenue: number }[];
    revenueByPlan: { plan: string; revenue: number }[];
  }> {
    const query: any = {};
    
    if (filters.startDate || filters.endDate) {
      query.createdAt = {};
      if (filters.startDate) query.createdAt.$gte = new Date(filters.startDate);
      if (filters.endDate) query.createdAt.$lte = new Date(filters.endDate);
    }

    const orders = await Order.find(query);

    const totalRevenue = orders
      .filter(o => o.status === "captured")
      .reduce((sum, o) => sum + o.amount, 0);

    const statusCounts = orders.reduce((acc, o) => {
      acc[o.status] = (acc[o.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const monthlyRevenue: Record<string, number> = {};
    orders.forEach(order => {
      if (order.status === "captured") {
        const month = new Date(order.createdAt).toLocaleString("en-US", { month: "short", year: "numeric" });
        monthlyRevenue[month] = (monthlyRevenue[month] || 0) + order.amount;
      }
    });

    const revenueByPlan: Record<string, number> = {};
    orders.forEach(order => {
      if (order.status === "captured") {
        revenueByPlan[order.plan] = (revenueByPlan[order.plan] || 0) + order.amount;
      }
    });

    return {
      totalRevenue,
      totalOrders: orders.length,
      successfulPayments: statusCounts["captured"] || 0,
      pendingPayments: statusCounts["created"] || 0,
      failedPayments: statusCounts["failed"] || 0,
      monthlyRevenue: Object.entries(monthlyRevenue).map(([month, revenue]) => ({ month, revenue })),
      revenueByPlan: Object.entries(revenueByPlan).map(([plan, revenue]) => ({ plan, revenue })),
    };
  }

  async processRefund(orderId: string, amount?: number): Promise<IOrder> {
    const order = await Order.findById(orderId);
    if (!order) throw new AppError("Order not found", 404);
    
    if (order.status !== "captured") {
      throw new AppError("Cannot refund an uncaptured payment", 400);
    }

    const refundAmount = amount || order.amount;
    if (refundAmount > order.amount) {
      throw new AppError("Refund amount cannot exceed original amount", 400);
    }

    order.refundAmount = refundAmount;
    order.refundDate = new Date();
    order.status = "refunded";
    
    await order.save();
    return order;
  }
}

export default new PaymentService();