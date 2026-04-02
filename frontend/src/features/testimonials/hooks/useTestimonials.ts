"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { testimonialService } from "../services/testimonial.service";

export function useTestimonials() {
  return useQuery({
    queryKey: ["testimonials"],
    queryFn: () => testimonialService.getAll(),
    staleTime: 10 * 60 * 1000,
  });
}

export function useCreateTestimonial() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: FormData) => testimonialService.create(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["testimonials"] }),
  });
}

export function useDeleteTestimonial() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => testimonialService.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["testimonials"] }),
  });
}
