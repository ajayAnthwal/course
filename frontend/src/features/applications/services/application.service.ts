import apiClient from "@/services/axios";
import type { ApiResponse, PaginatedResponse } from "@/types";

export interface Application {
  _id: string;
  user: string;
  college: {
    _id: string;
    name: string;
    logo?: string;
    coverImage?: string;
    location?: {
      city: string;
      state: string;
    };
    type: string;
  };
  course: string;
  status: "applied" | "under_review" | "shortlisted" | "rejected" | "accepted" | "paid" | "enrolled";
  paymentStatus: "pending" | "paid" | "failed" | "refunded";
  paymentAmount?: number;
  paymentId?: string;
  formData?: Record<string, any>;
  notes?: string;
  timeline: {
    status: string;
    note?: string;
    date: string;
  }[];
  appliedAt: string;
  updatedAt: string;
}

export interface ApplicationStats {
  total: number;
  applied: number;
  underReview: number;
  shortlisted: number;
  accepted: number;
  rejected: number;
}

export const applicationService = {
  getAll: async (params?: Record<string, any>) => {
    const response = await apiClient.get<ApiResponse<Application[]> & { pagination: any }>("/applications", { params });
    return response.data;
  },

  getById: async (id: string) => {
    const response = await apiClient.get<ApiResponse<Application>>(`/applications/${id}`);
    return response.data;
  },

  create: async (data: { collegeId: string; course: string; formData?: Record<string, any>; paymentAmount?: number }) => {
    const response = await apiClient.post<ApiResponse<Application>>("/applications", data);
    return response.data;
  },

  update: async (id: string, data: { status?: string; notes?: string; formData?: Record<string, any> }) => {
    const response = await apiClient.patch<ApiResponse<Application>>(`/applications/${id}`, data);
    return response.data;
  },

  updatePayment: async (id: string, data: { paymentId: string; status: "paid" | "failed" }) => {
    const response = await apiClient.patch<ApiResponse<Application>>(`/applications/${id}/payment`, data);
    return response.data;
  },

  cancel: async (id: string) => {
    const response = await apiClient.delete<ApiResponse<Application>>(`/applications/${id}`);
    return response.data;
  },

  getStats: async () => {
    const response = await apiClient.get<ApiResponse<ApplicationStats>>("/applications/stats");
    return response.data;
  },
};