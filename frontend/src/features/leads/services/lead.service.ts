import apiClient from "@/services/axios";
import type { ApiResponse, PaginatedResponse, Lead } from "@/types";

interface CreateLeadInput {
  name: string;
  email: string;
  phone: string;
  college: string;
  course?: string;
  message?: string;
  source?: string;
}

interface GetLeadsQuery {
  page?: number;
  limit?: number;
  status?: string;
  college?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export const leadService = {
  async getAll(filters: GetLeadsQuery = {}): Promise<PaginatedResponse<Lead>> {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.append(key, String(value));
      }
    });
    const response = await apiClient.get(`/leads?${params.toString()}`);
    return response.data;
  },

  async getById(id: string): Promise<ApiResponse<Lead>> {
    const response = await apiClient.get(`/leads/${id}`);
    return response.data;
  },

  async create(data: CreateLeadInput): Promise<ApiResponse<Lead>> {
    const response = await apiClient.post("/leads", data);
    return response.data;
  },

  async update(id: string, data: Partial<Lead>): Promise<ApiResponse<Lead>> {
    const response = await apiClient.patch(`/leads/${id}`, data);
    return response.data;
  },

  async delete(id: string): Promise<ApiResponse<void>> {
    const response = await apiClient.delete(`/leads/${id}`);
    return response.data;
  },

  async getStats(): Promise<ApiResponse<{ total: number; new: number; contacted: number; interested: number; admitted: number }>> {
    const response = await apiClient.get("/leads/stats");
    return response.data;
  },
};
