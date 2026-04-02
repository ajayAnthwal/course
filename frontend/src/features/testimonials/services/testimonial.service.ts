import apiClient from "@/services/axios";
import type { ApiResponse, PaginatedResponse, Testimonial } from "@/types";

export const testimonialService = {
  async getAll(): Promise<PaginatedResponse<Testimonial>> {
    const response = await apiClient.get("/testimonials");
    return response.data;
  },

  async getById(id: string): Promise<ApiResponse<Testimonial>> {
    const response = await apiClient.get(`/testimonials/${id}`);
    return response.data;
  },

  async create(data: FormData): Promise<ApiResponse<Testimonial>> {
    const response = await apiClient.post("/testimonials", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  async update(id: string, data: FormData): Promise<ApiResponse<Testimonial>> {
    const response = await apiClient.patch(`/testimonials/${id}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  async delete(id: string): Promise<ApiResponse<void>> {
    const response = await apiClient.delete(`/testimonials/${id}`);
    return response.data;
  },
};
