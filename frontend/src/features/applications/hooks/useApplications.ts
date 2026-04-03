import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { applicationService, Application, ApplicationStats } from "../services/application.service";
import type { ApiResponse, PaginatedResponse } from "@/types";

export function useApplications(params?: Record<string, any>) {
  return useQuery<PaginatedResponse<Application>>({
    queryKey: ["applications", params],
    queryFn: async () => {
      const response = await applicationService.getAll(params);
      return response as any;
    },
  });
}

export function useApplication(id: string) {
  return useQuery<ApiResponse<Application>>({
    queryKey: ["application", id],
    queryFn: async () => {
      const response = await applicationService.getById(id);
      return response as any;
    },
    enabled: !!id,
  });
}

export function useApplicationStats() {
  return useQuery<ApiResponse<ApplicationStats>>({
    queryKey: ["application-stats"],
    queryFn: async () => {
      const response = await applicationService.getStats();
      return response as any;
    },
  });
}

export function useCreateApplication() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { collegeId: string; course: string; formData?: Record<string, any>; paymentAmount?: number }) =>
      applicationService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      queryClient.invalidateQueries({ queryKey: ["application-stats"] });
    },
  });
}

export function useUpdateApplication() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: { status?: string; notes?: string; formData?: Record<string, any> } }) =>
      applicationService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      queryClient.invalidateQueries({ queryKey: ["application-stats"] });
    },
  });
}

export function useCancelApplication() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => applicationService.cancel(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      queryClient.invalidateQueries({ queryKey: ["application-stats"] });
    },
  });
}