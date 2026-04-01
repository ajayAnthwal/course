"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { paymentService } from "../services/payment.service";

interface CreateOrderInput {
  plan: "basic" | "premium" | "enterprise";
  collegeId?: string;
}

interface VerifyPaymentInput {
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
}

export function usePaymentPlans() {
  return useQuery({
    queryKey: ["payments", "plans"],
    queryFn: () => paymentService.getPlans(),
    staleTime: 30 * 60 * 1000,
  });
}

export function useMyOrders() {
  return useQuery({
    queryKey: ["payments", "orders"],
    queryFn: () => paymentService.getMyOrders(),
    staleTime: 2 * 60 * 1000,
  });
}

export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateOrderInput) => paymentService.createOrder(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payments"] });
    },
  });
}

export function useVerifyPayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: VerifyPaymentInput) => paymentService.verifyPayment(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payments"] });
    },
  });
}
