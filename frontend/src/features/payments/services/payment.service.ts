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
  user: string;
  college?: { _id: string; name: string };
  plan: string;
  amount: number;
  currency: string;
  razorpayOrderId: string;
  razorpayPaymentId?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
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
};
