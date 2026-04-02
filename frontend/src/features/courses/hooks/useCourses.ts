"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { courseService } from "../services/course.service";

export function useCourses(filters: Record<string, any> = {}) {
  return useQuery({
    queryKey: ["courses", filters],
    queryFn: () => courseService.getAll(filters),
    staleTime: 5 * 60 * 1000,
  });
}

export function useCourse(id: string) {
  return useQuery({
    queryKey: ["courses", id],
    queryFn: () => courseService.getById(id),
    enabled: !!id,
  });
}

export function useCourseBySlug(slug: string) {
  return useQuery({
    queryKey: ["courses", "slug", slug],
    queryFn: () => courseService.getBySlug(slug),
    enabled: !!slug,
  });
}

export function useFeaturedCourses() {
  return useQuery({
    queryKey: ["courses", "featured"],
    queryFn: () => courseService.getFeatured(),
    staleTime: 10 * 60 * 1000,
  });
}

export function useCreateCourse() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: FormData) => courseService.create(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["courses"] }),
  });
}

export function useUpdateCourse() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: FormData }) => courseService.update(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["courses"] }),
  });
}

export function useDeleteCourse() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => courseService.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["courses"] }),
  });
}
