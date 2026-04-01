import apiClient from "@/services/axios";
import type { ApiResponse, PaginatedResponse, Exam } from "@/types";

export const examService = {
  async getAll(filters: Record<string, any> = {}): Promise<PaginatedResponse<Exam>> {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") params.append(key, String(value));
    });
    const response = await apiClient.get(`/exams?${params.toString()}`);
    return response.data;
  },

  async getById(id: string): Promise<ApiResponse<Exam>> {
    const response = await apiClient.get(`/exams/${id}`);
    return response.data;
  },

  async getBySlug(slug: string): Promise<ApiResponse<Exam>> {
    const response = await apiClient.get(`/exams/slug/${slug}`);
    return response.data;
  },

  async getFeatured(): Promise<ApiResponse<Exam[]>> {
    const response = await apiClient.get("/exams/featured");
    return response.data;
  },
};
