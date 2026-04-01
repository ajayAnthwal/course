import apiClient from "@/services/axios";
import type { ApiResponse, PaginatedResponse, User } from "@/types";

interface GetUsersQuery {
  page?: number;
  limit?: number;
  role?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

interface UpdateUserInput {
  name?: string;
  phone?: string;
  role?: string;
  isActive?: boolean;
}

export const userService = {
  async getAll(filters: GetUsersQuery = {}): Promise<PaginatedResponse<User>> {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.append(key, String(value));
      }
    });
    const response = await apiClient.get(`/users?${params.toString()}`);
    return response.data;
  },

  async getById(id: string): Promise<ApiResponse<User>> {
    const response = await apiClient.get(`/users/${id}`);
    return response.data;
  },

  async update(id: string, data: UpdateUserInput): Promise<ApiResponse<User>> {
    const response = await apiClient.patch(`/users/${id}`, data);
    return response.data;
  },

  async delete(id: string): Promise<ApiResponse<void>> {
    const response = await apiClient.delete(`/users/${id}`);
    return response.data;
  },
};
