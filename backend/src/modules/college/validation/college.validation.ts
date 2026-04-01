import { z } from "zod";

export const createCollegeSchema = z.object({
  body: z.object({
    name: z.string().min(2).max(200),
    description: z.string().min(10).max(5000),
    logo: z.string().url().optional(),
    coverImage: z.string().url().optional(),
    location: z.object({
      city: z.string().min(1),
      state: z.string().min(1),
      country: z.string().default("India"),
      address: z.string().optional(),
      pincode: z.string().optional(),
    }),
    type: z.enum(["government", "private", "deemed", "autonomous"]),
    establishedYear: z.number().min(1800).max(new Date().getFullYear()),
    approvedBy: z.array(z.string()).optional(),
    courses: z
      .array(
        z.object({
          name: z.string().min(1),
          duration: z.string().optional(),
          fees: z
            .object({
              min: z.number().min(0),
              max: z.number().min(0),
              currency: z.string().default("INR"),
            })
            .optional(),
          level: z.enum(["undergraduate", "postgraduate", "diploma", "doctorate"]).optional(),
        })
      )
      .optional(),
    facilities: z.array(z.string()).optional(),
    entranceExams: z.array(z.string()).optional(),
    website: z.string().url().optional(),
    email: z.string().email().optional(),
    phone: z.string().optional(),
    featured: z.boolean().optional(),
  }),
});

export const updateCollegeSchema = z.object({
  body: createCollegeSchema.shape.body.partial(),
});

export const getCollegesQuerySchema = z.object({
  query: z.object({
    page: z.string().optional(),
    limit: z.string().optional(),
    search: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    type: z.enum(["government", "private", "deemed", "autonomous"]).optional(),
    course: z.string().optional(),
    minFees: z.string().optional(),
    maxFees: z.string().optional(),
    minRating: z.string().optional(),
    featured: z.string().optional(),
    sortBy: z.string().optional(),
    sortOrder: z.enum(["asc", "desc"]).optional(),
  }),
});
