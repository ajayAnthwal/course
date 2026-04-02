"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { categoryService } from "../services/category.service";

export function useCategories(filters: Record<string, any> = {}) {
  return useQuery({
    queryKey: ["categories", filters],
    queryFn: () => categoryService.getAll(filters),
    staleTime: 10 * 60 * 1000,
  });
}

export function useCategory(id: string) {
  return useQuery({
    queryKey: ["categories", id],
    queryFn: () => categoryService.getById(id),
    enabled: !!id,
  });
}

export function useCreateCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: FormData) => categoryService.create(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["categories"] }),
  });
}

export function useUpdateCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: FormData }) => categoryService.update(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["categories"] }),
  });
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => categoryService.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["categories"] }),
  });
}
