"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { collegeService } from "../services/college.service";
import type { CollegeFilters } from "@/types";

export function useColleges(filters: CollegeFilters = {}) {
  return useQuery({
    queryKey: ["colleges", filters],
    queryFn: () => collegeService.getAll(filters),
    staleTime: 5 * 60 * 1000,
  });
}

export function useCollege(id: string) {
  return useQuery({
    queryKey: ["colleges", id],
    queryFn: () => collegeService.getById(id),
    enabled: !!id,
  });
}

export function useCollegeBySlug(slug: string) {
  return useQuery({
    queryKey: ["colleges", "slug", slug],
    queryFn: () => collegeService.getBySlug(slug),
    enabled: !!slug,
  });
}

export function useFeaturedColleges() {
  return useQuery({
    queryKey: ["colleges", "featured"],
    queryFn: () => collegeService.getFeatured(),
    staleTime: 10 * 60 * 1000,
  });
}

export function useCollegeStats() {
  return useQuery({
    queryKey: ["colleges", "stats"],
    queryFn: () => collegeService.getStats(),
    staleTime: 10 * 60 * 1000,
  });
}

export function useCreateCollege() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: collegeService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["colleges"] });
    },
  });
}

export function useUpdateCollege() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<College> }) =>
      collegeService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["colleges"] });
    },
  });
}

export function useDeleteCollege() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: collegeService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["colleges"] });
    },
  });
}
