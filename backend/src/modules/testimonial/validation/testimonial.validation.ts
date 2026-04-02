import { z } from "zod";

export const createTestimonialSchema = z.object({
  body: z.object({
    name: z.string().min(1).max(100),
    role: z.string().min(1).max(100),
    rating: z.number().min(1).max(5).optional(),
    content: z.string().min(10).max(1000),
    college: z.string().optional(),
  }),
});

export const updateTestimonialSchema = z.object({
  body: createTestimonialSchema.shape.body.partial(),
});
