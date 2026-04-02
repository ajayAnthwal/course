import apiClient from "@/services/axios";
import type { ApiResponse, PaginatedResponse, Blog } from "@/types";

export const blogService = {
  async getAll(filters: Record<string, any> = {}): Promise<PaginatedResponse<Blog>> {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") params.append(key, String(value));
    });
    const response = await apiClient.get(`/blogs?${params.toString()}`);
    return response.data;
  },

  async getById(id: string): Promise<ApiResponse<Blog>> {
    const response = await apiClient.get(`/blogs/${id}`);
    return response.data;
  },

  async getBySlug(slug: string): Promise<ApiResponse<Blog>> {
    const response = await apiClient.get(`/blogs/slug/${slug}`);
    return response.data;
  },

  async getFeatured(): Promise<ApiResponse<Blog[]>> {
    const response = await apiClient.get("/blogs/featured");
    return response.data;
  },

  async getLatest(): Promise<ApiResponse<Blog[]>> {
    const response = await apiClient.get("/blogs/latest");
    return response.data;
  },

  async create(data: FormData): Promise<ApiResponse<Blog>> {
    const response = await apiClient.post("/blogs", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  async update(id: string, data: FormData): Promise<ApiResponse<Blog>> {
    const response = await apiClient.patch(`/blogs/${id}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  async delete(id: string): Promise<ApiResponse<void>> {
    const response = await apiClient.delete(`/blogs/${id}`);
    return response.data;
  },
};
