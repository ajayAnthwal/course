"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { blogService } from "../services/blog.service";

export function useBlogs(filters: Record<string, any> = {}) {
  return useQuery({
    queryKey: ["blogs", filters],
    queryFn: () => blogService.getAll(filters),
    staleTime: 5 * 60 * 1000,
  });
}

export function useBlogBySlug(slug: string) {
  return useQuery({
    queryKey: ["blogs", "slug", slug],
    queryFn: () => blogService.getBySlug(slug),
    enabled: !!slug,
  });
}

export function useFeaturedBlogs() {
  return useQuery({
    queryKey: ["blogs", "featured"],
    queryFn: () => blogService.getFeatured(),
    staleTime: 10 * 60 * 1000,
  });
}

export function useLatestBlogs() {
  return useQuery({
    queryKey: ["blogs", "latest"],
    queryFn: () => blogService.getLatest(),
    staleTime: 5 * 60 * 1000,
  });
}

export function useCreateBlog() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: FormData) => blogService.create(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["blogs"] }),
  });
}

export function useUpdateBlog() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: FormData }) => blogService.update(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["blogs"] }),
  });
}

export function useDeleteBlog() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => blogService.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["blogs"] }),
  });
}
