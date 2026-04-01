import apiClient from "@/services/axios";
import type { ApiResponse, PaginatedResponse, College, CollegeFilters } from "@/types";

export const collegeService = {
  async getAll(filters: CollegeFilters = {}): Promise<PaginatedResponse<College>> {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.append(key, String(value));
      }
    });
    const response = await apiClient.get(`/colleges?${params.toString()}`);
    return response.data;
  },

  async getById(id: string): Promise<ApiResponse<College>> {
    const response = await apiClient.get(`/colleges/${id}`);
    return response.data;
  },

  async getBySlug(slug: string): Promise<ApiResponse<College>> {
    const response = await apiClient.get(`/colleges/slug/${slug}`);
    return response.data;
  },

  async getFeatured(): Promise<ApiResponse<College[]>> {
    const response = await apiClient.get("/colleges/featured");
    return response.data;
  },

  async getStats(): Promise<ApiResponse<{ total: number; government: number; private: number; featured: number }>> {
    const response = await apiClient.get("/colleges/stats");
    return response.data;
  },

  async create(data: Partial<College>): Promise<ApiResponse<College>> {
    const response = await apiClient.post("/colleges", data);
    return response.data;
  },

  async update(id: string, data: Partial<College>): Promise<ApiResponse<College>> {
    const response = await apiClient.patch(`/colleges/${id}`, data);
    return response.data;
  },

  async delete(id: string): Promise<ApiResponse<void>> {
    const response = await apiClient.delete(`/colleges/${id}`);
    return response.data;
  },
};
