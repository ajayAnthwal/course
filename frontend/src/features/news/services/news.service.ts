import apiClient from "@/services/axios";
import type { ApiResponse, PaginatedResponse, NewsArticle } from "@/types";

export const newsService = {
  async getAll(filters: Record<string, any> = {}): Promise<PaginatedResponse<NewsArticle>> {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") params.append(key, String(value));
    });
    const response = await apiClient.get(`/news?${params.toString()}`);
    return response.data;
  },

  async getById(id: string): Promise<ApiResponse<NewsArticle>> {
    const response = await apiClient.get(`/news/${id}`);
    return response.data;
  },

  async getBySlug(slug: string): Promise<ApiResponse<NewsArticle>> {
    const response = await apiClient.get(`/news/slug/${slug}`);
    return response.data;
  },

  async getFeatured(): Promise<ApiResponse<NewsArticle[]>> {
    const response = await apiClient.get("/news/featured");
    return response.data;
  },

  async getLatest(): Promise<ApiResponse<NewsArticle[]>> {
    const response = await apiClient.get("/news/latest");
    return response.data;
  },
};
