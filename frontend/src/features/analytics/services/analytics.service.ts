import apiClient from "@/services/axios";
import type { ApiResponse } from "@/types";

export interface DashboardStats {
  users: { total: number };
  colleges: { total: number };
  leads: {
    total: number;
    new: number;
    contacted: number;
    interested: number;
    admitted: number;
    conversionRate: number;
  };
  revenue: {
    total: number;
    successful: number;
    pending: number;
  };
  charts: {
    leadsOverTime: { name: string; value: number }[];
    collegeDistribution: { name: string; value: number; color: string }[];
  };
  recentLeads: {
    _id: string;
    name: string;
    email: string;
    phone: string;
    course?: string;
    status: string;
    createdAt: string;
  }[];
}

export interface AnalyticsData {
  data: DashboardStats;
}

export const analyticsService = {
  getDashboardStats: async () => {
    const response = await apiClient.get<ApiResponse<DashboardStats>>("/analytics/dashboard");
    return response.data;
  },

  getRevenueStats: async (params?: Record<string, any>) => {
    const response = await apiClient.get("/analytics/revenue", { params });
    return response.data;
  },

  getLeadAnalytics: async (params?: Record<string, any>) => {
    const response = await apiClient.get("/analytics/leads", { params });
    return response.data;
  },

  getCollegePerformance: async () => {
    const response = await apiClient.get("/analytics/colleges");
    return response.data;
  },
};