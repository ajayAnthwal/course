"use client";

import { useQuery } from "@tanstack/react-query";
import { examService } from "../services/exam.service";

export function useExams(filters: Record<string, any> = {}) {
  return useQuery({
    queryKey: ["exams", filters],
    queryFn: () => examService.getAll(filters),
    staleTime: 5 * 60 * 1000,
  });
}

export function useExam(id: string) {
  return useQuery({
    queryKey: ["exams", id],
    queryFn: () => examService.getById(id),
    enabled: !!id,
  });
}

export function useExamBySlug(slug: string) {
  return useQuery({
    queryKey: ["exams", "slug", slug],
    queryFn: () => examService.getBySlug(slug),
    enabled: !!slug,
  });
}

export function useFeaturedExams() {
  return useQuery({
    queryKey: ["exams", "featured"],
    queryFn: () => examService.getFeatured(),
    staleTime: 10 * 60 * 1000,
  });
}
