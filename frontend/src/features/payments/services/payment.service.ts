import apiClient from "@/services/axios";
import type { ApiResponse } from "@/types";

interface PlanDetails {
  plan: string;
  amount: number;
  currency: string;
  amountDisplay: string;
  durationDays: number;
}

interface CreateOrderInput {
  plan: "basic" | "premium" | "enterprise";
  collegeId?: string;
}

interface OrderResponse {
  orderId: string;
  razorpayOrderId: string;
  amount: number;
  currency: string;
  plan: string;
}

interface VerifyPaymentInput {
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
}

interface PaymentOrder {
  _id: string;
  user: { _id: string; name: string; email: string; role: string };
  college?: { _id: string; name: string };
  plan: string;
  amount: number;
  currency: string;
  razorpayOrderId: string;
  razorpayPaymentId?: string;
  status: string;
  refundAmount?: number;
  refundDate?: string;
  createdAt: string;
  updatedAt: string;
}

interface PaymentStats {
  totalRevenue: number;
  totalOrders: number;
  successfulPayments: number;
  pendingPayments: number;
  failedPayments: number;
  monthlyRevenue: { month: string; revenue: number }[];
  revenueByPlan: { plan: string; revenue: number }[];
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export const paymentService = {
  async getPlans(): Promise<ApiResponse<PlanDetails[]>> {
    const response = await apiClient.get("/payments/plans");
    return response.data;
  },

  async createOrder(data: CreateOrderInput): Promise<ApiResponse<OrderResponse>> {
    const response = await apiClient.post("/payments/order", data);
    return response.data;
  },

  async verifyPayment(data: VerifyPaymentInput): Promise<ApiResponse<PaymentOrder>> {
    const response = await apiClient.post("/payments/verify", data);
    return response.data;
  },

  async getMyOrders(): Promise<ApiResponse<PaymentOrder[]>> {
    const response = await apiClient.get("/payments/orders");
    return response.data;
  },

  async getOrderById(id: string): Promise<ApiResponse<PaymentOrder>> {
    const response = await apiClient.get(`/payments/orders/${id}`);
    return response.data;
  },

  async getAllOrders(params?: {
    page?: number;
    limit?: number;
    status?: string;
    startDate?: string;
    endDate?: string;
    search?: string;
  }): Promise<ApiResponse<PaymentOrder[]>> {
    const response = await apiClient.get("/payments/all", { params });
    return response.data;
  },

  async getPaymentStats(params?: {
    startDate?: string;
    endDate?: string;
  }): Promise<ApiResponse<PaymentStats>> {
    const response = await apiClient.get("/payments/stats", { params });
    return response.data;
  },

  async updateOrderStatus(orderId: string, status: string): Promise<ApiResponse<PaymentOrder>> {
    const response = await apiClient.patch(`/payments/orders/${orderId}/status`, { status });
    return response.data;
  },

  async processRefund(orderId: string, amount?: number): Promise<ApiResponse<PaymentOrder>> {
    const response = await apiClient.post("/payments/refund", { orderId, amount });
    return response.data;
  },

  async exportOrders(params?: {
    startDate?: string;
    endDate?: string;
    status?: string;
  }): Promise<Blob> {
    const response = await apiClient.get("/payments/export", { 
      params,
      responseType: "blob" 
    });
    return response.data;
  },
};