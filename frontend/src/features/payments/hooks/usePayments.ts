import { useQuery } from "@tanstack/react-query";
import { paymentService } from "../services/payment.service";

export function usePaymentStats(params?: { startDate?: string; endDate?: string }) {
  return useQuery({
    queryKey: ["paymentStats", params],
    queryFn: () => paymentService.getPaymentStats(params),
    enabled: !!params?.startDate || !!params?.endDate || true,
  });
}

export function useAllOrders(params?: { page?: number; limit?: number; status?: string; search?: string }) {
  return useQuery({
    queryKey: ["allOrders", params],
    queryFn: () => paymentService.getAllOrders(params),
  });
}

export function usePaymentOrders() {
  return useQuery({
    queryKey: ["paymentOrders"],
    queryFn: () => paymentService.getMyOrders(),
  });
}