"use client";

import { useQuery } from "@tanstack/react-query";
import { statsService } from "../services/stats.service";

export function useSiteStats() {
  return useQuery({
    queryKey: ["stats"],
    queryFn: () => statsService.get(),
    staleTime: 10 * 60 * 1000,
  });
}
