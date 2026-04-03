import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { wishlistService, WishlistItem, WishlistStats } from "../services/wishlist.service";
import type { ApiResponse, PaginatedResponse } from "@/types";

export function useWishlist(params?: Record<string, any>) {
  return useQuery<PaginatedResponse<WishlistItem>>({
    queryKey: ["wishlist", params],
    queryFn: async () => {
      const response = await wishlistService.getAll(params);
      return response as any;
    },
  });
}

export function useWishlistStats() {
  return useQuery<ApiResponse<WishlistStats>>({
    queryKey: ["wishlist-stats"],
    queryFn: async () => {
      const response = await wishlistService.getStats();
      return response as any;
    },
  });
}

export function useAddToWishlist() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ collegeId, notes }: { collegeId: string; notes?: string }) =>
      wishlistService.add(collegeId, notes),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      queryClient.invalidateQueries({ queryKey: ["wishlist-stats"] });
    },
  });
}

export function useRemoveFromWishlist() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (collegeId: string) => wishlistService.remove(collegeId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      queryClient.invalidateQueries({ queryKey: ["wishlist-stats"] });
    },
  });
}

export function useCheckWishlist(collegeId: string) {
  return useQuery<ApiResponse<{ isInWishlist: boolean }>>({
    queryKey: ["wishlist-check", collegeId],
    queryFn: async () => {
      const response = await wishlistService.check(collegeId);
      return response as any;
    },
    enabled: !!collegeId,
  });
}