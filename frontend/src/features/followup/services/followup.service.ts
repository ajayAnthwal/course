import apiClient from "@/services/axios";
import type { ApiResponse } from "@/types";

export interface Followup {
  _id: string;
  lead: {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    course?: string;
  };
  user: {
    _id: string;
    name: string;
  };
  type: "call" | "meeting" | "email" | "reminder" | "note";
  subject: string;
  description?: string;
  status: "pending" | "completed" | "cancelled" | "missed";
  dueDate: string;
  completedAt?: string;
  outcome?: string;
  priority: "low" | "medium" | "high";
  createdAt: string;
}

interface FollowupsResponse {
  data: Followup[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

interface FollowupStats {
  total: number;
  pending: number;
  completed: number;
  missed: number;
  todayReminders: number;
}

export const followupService = {
  getAll: async (params?: Record<string, any>) => {
    const response = await apiClient.get<ApiResponse<FollowupsResponse>>("/followups", { params });
    return response.data;
  },

  getById: async (id: string) => {
    const response = await apiClient.get<ApiResponse<Followup>>(`/followups/${id}`);
    return response.data;
  },

  create: async (data: Partial<Followup>) => {
    const response = await apiClient.post<ApiResponse<Followup>>("/followups", data);
    return response.data;
  },

  update: async (id: string, data: Partial<Followup>) => {
    const response = await apiClient.patch<ApiResponse<Followup>>(`/followups/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await apiClient.delete<ApiResponse>(`/followups/${id}`);
    return response.data;
  },

  getStats: async () => {
    const response = await apiClient.get<ApiResponse<FollowupStats>>("/followups/stats");
    return response.data;
  },

  getUpcoming: async () => {
    const response = await apiClient.get<ApiResponse<Followup[]>>("/followups/upcoming");
    return response.data;
  },
};