import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { followupService, Followup, FollowupStats } from "../services/followup.service";
import type { ApiResponse, PaginatedResponse } from "@/types";

export function useFollowups(params?: Record<string, any>) {
  return useQuery<PaginatedResponse<Followup>>({
    queryKey: ["followups", params],
    queryFn: async () => {
      const response = await followupService.getAll(params);
      return response as any;
    },
  });
}

export function useFollowup(id: string) {
  return useQuery<ApiResponse<Followup>>({
    queryKey: ["followup", id],
    queryFn: async () => {
      const response = await followupService.getById(id);
      return response as any;
    },
    enabled: !!id,
  });
}

export function useFollowupStats() {
  return useQuery<ApiResponse<FollowupStats>>({
    queryKey: ["followup-stats"],
    queryFn: async () => {
      const response = await followupService.getStats();
      return response as any;
    },
  });
}

export function useUpcomingFollowups() {
  return useQuery<ApiResponse<Followup[]>>({
    queryKey: ["upcoming-followups"],
    queryFn: async () => {
      const response = await followupService.getUpcoming();
      return response as any;
    },
  });
}

export function useCreateFollowup() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<Followup>) => followupService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["followups"] });
      queryClient.invalidateQueries({ queryKey: ["followup-stats"] });
      queryClient.invalidateQueries({ queryKey: ["upcoming-followups"] });
    },
  });
}

export function useUpdateFollowup() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Followup> }) =>
      followupService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["followups"] });
      queryClient.invalidateQueries({ queryKey: ["followup-stats"] });
      queryClient.invalidateQueries({ queryKey: ["upcoming-followups"] });
    },
  });
}

export function useDeleteFollowup() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => followupService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["followups"] });
      queryClient.invalidateQueries({ queryKey: ["followup-stats"] });
      queryClient.invalidateQueries({ queryKey: ["upcoming-followups"] });
    },
  });
}