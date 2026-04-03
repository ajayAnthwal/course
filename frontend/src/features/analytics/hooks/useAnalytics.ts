import { useQuery } from "@tanstack/react-query";
import { analyticsService, DashboardStats } from "../services/analytics.service";
import type { ApiResponse } from "@/types";

export function useDashboardStats() {
  return useQuery<ApiResponse<DashboardStats>>({
    queryKey: ["dashboard-stats"],
    queryFn: async () => {
      const response = await analyticsService.getDashboardStats();
      return response as any;
    },
  });
}

export function useRevenueStats(params?: Record<string, any>) {
  return useQuery({
    queryKey: ["revenue-stats", params],
    queryFn: async () => {
      const response = await analyticsService.getRevenueStats(params);
      return response as any;
    },
  });
}

export function useLeadAnalytics(params?: Record<string, any>) {
  return useQuery({
    queryKey: ["lead-analytics", params],
    queryFn: async () => {
      const response = await analyticsService.getLeadAnalytics(params);
      return response as any;
    },
  });
}

export function useCollegePerformance() {
  return useQuery({
    queryKey: ["college-performance"],
    queryFn: async () => {
      const response = await analyticsService.getCollegePerformance();
      return response as any;
    },
  });
}