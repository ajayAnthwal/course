import apiClient from "@/services/axios";
import type { ApiResponse } from "@/types";

interface SiteStats {
  colleges: number;
  courses: number;
  students: number;
  news: number;
  blogs: number;
  categories: number;
  testimonials: number;
}

export const statsService = {
  async get(): Promise<ApiResponse<SiteStats>> {
    const response = await apiClient.get("/stats");
    return response.data;
  },
};
