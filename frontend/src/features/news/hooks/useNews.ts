"use client";

import { useQuery } from "@tanstack/react-query";
import { newsService } from "../services/news.service";

export function useNews(filters: Record<string, any> = {}) {
  return useQuery({
    queryKey: ["news", filters],
    queryFn: () => newsService.getAll(filters),
    staleTime: 5 * 60 * 1000,
  });
}

export function useNewsBySlug(slug: string) {
  return useQuery({
    queryKey: ["news", "slug", slug],
    queryFn: () => newsService.getBySlug(slug),
    enabled: !!slug,
  });
}

export function useFeaturedNews() {
  return useQuery({
    queryKey: ["news", "featured"],
    queryFn: () => newsService.getFeatured(),
    staleTime: 10 * 60 * 1000,
  });
}

export function useLatestNews() {
  return useQuery({
    queryKey: ["news", "latest"],
    queryFn: () => newsService.getLatest(),
    staleTime: 5 * 60 * 1000,
  });
}
