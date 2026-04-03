import apiClient from "@/services/axios";
import type { ApiResponse, PaginatedResponse } from "@/types";

export interface WishlistItem {
  _id: string;
  college: {
    _id: string;
    name: string;
    logo?: string;
    coverImage?: string;
    location: {
      city: string;
      state: string;
      rating?: number;
    };
    type: string;
    feeStructure?: {
      min: number;
      max: number;
    };
  };
  notes?: string;
  createdAt: string;
}

export interface WishlistStats {
  total: number;
  totalColleges: number;
}

export const wishlistService = {
  getAll: async (params?: Record<string, any>) => {
    const response = await apiClient.get<ApiResponse<WishlistItem[]> & { pagination: any }>("/wishlist", { params });
    return response.data;
  },

  add: async (collegeId: string, notes?: string) => {
    const response = await apiClient.post<ApiResponse<WishlistItem>>("/wishlist", { collegeId, notes });
    return response.data;
  },

  remove: async (collegeId: string) => {
    const response = await apiClient.delete<ApiResponse>(`/wishlist/${collegeId}`);
    return response.data;
  },

  check: async (collegeId: string) => {
    const response = await apiClient.get<ApiResponse<{ isInWishlist: boolean }>>("/wishlist/check", { params: { collegeId } });
    return response.data;
  },

  updateNotes: async (collegeId: string, notes: string) => {
    const response = await apiClient.patch<ApiResponse<WishlistItem>>(`/wishlist/${collegeId}`, { notes });
    return response.data;
  },

  getStats: async () => {
    const response = await apiClient.get<ApiResponse<WishlistStats>>("/wishlist/stats");
    return response.data;
  },
};