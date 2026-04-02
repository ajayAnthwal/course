import apiClient from "@/services/axios";
import type { ApiResponse, PaginatedResponse, Category } from "@/types";

export const categoryService = {
  async getAll(filters: Record<string, any> = {}): Promise<PaginatedResponse<Category>> {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") params.append(key, String(value));
    });
    const response = await apiClient.get(`/categories?${params.toString()}`);
    return response.data;
  },

  async getById(id: string): Promise<ApiResponse<Category>> {
    const response = await apiClient.get(`/categories/${id}`);
    return response.data;
  },

  async create(data: FormData): Promise<ApiResponse<Category>> {
    const response = await apiClient.post("/categories", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  async update(id: string, data: FormData): Promise<ApiResponse<Category>> {
    const response = await apiClient.patch(`/categories/${id}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  async delete(id: string): Promise<ApiResponse<void>> {
    const response = await apiClient.delete(`/categories/${id}`);
    return response.data;
  },
};
