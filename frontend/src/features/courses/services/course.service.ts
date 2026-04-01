import apiClient from "@/services/axios";
import type { ApiResponse, PaginatedResponse, Course } from "@/types";

export const courseService = {
  async getAll(filters: Record<string, any> = {}): Promise<PaginatedResponse<Course>> {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") params.append(key, String(value));
    });
    const response = await apiClient.get(`/courses?${params.toString()}`);
    return response.data;
  },

  async getById(id: string): Promise<ApiResponse<Course>> {
    const response = await apiClient.get(`/courses/${id}`);
    return response.data;
  },

  async getBySlug(slug: string): Promise<ApiResponse<Course>> {
    const response = await apiClient.get(`/courses/slug/${slug}`);
    return response.data;
  },

  async getFeatured(): Promise<ApiResponse<Course[]>> {
    const response = await apiClient.get("/courses/featured");
    return response.data;
  },
};
