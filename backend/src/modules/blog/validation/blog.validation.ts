import { z } from "zod";

export const createBlogSchema = z.object({
  body: z.object({
    title: z.string().min(5).max(500),
    excerpt: z.string().min(10).max(500),
    content: z.string().min(20).max(50000),
    image: z.string().optional(),
    category: z.string().min(1),
    author: z.string().min(1),
    authorAvatar: z.string().optional(),
    tags: z.array(z.string()).optional(),
    readTime: z.string().optional(),
    featured: z.boolean().optional(),
    publishedAt: z.string().datetime().optional(),
  }),
});

export const updateBlogSchema = z.object({
  body: createBlogSchema.shape.body.partial(),
});

export const getBlogsQuerySchema = z.object({
  query: z.object({
    page: z.string().optional(),
    limit: z.string().optional(),
    search: z.string().optional(),
    category: z.string().optional(),
    featured: z.string().optional(),
    sortBy: z.string().optional(),
    sortOrder: z.enum(["asc", "desc"]).optional(),
  }),
});
