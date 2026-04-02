import { z } from "zod";

export const createCategorySchema = z.object({
  body: z.object({
    name: z.string().min(1).max(100),
    description: z.string().max(500).optional(),
    icon: z.string().optional(),
    color: z.string().optional(),
    count: z.number().min(0).optional(),
  }),
});

export const updateCategorySchema = z.object({
  body: createCategorySchema.shape.body.partial(),
});

export const getCategoriesQuerySchema = z.object({
  query: z.object({
    page: z.string().optional(),
    limit: z.string().optional(),
    search: z.string().optional(),
  }),
});
