import { z } from "zod";

export const createLeadSchema = z.object({
  body: z.object({
    name: z.string().min(2).max(100),
    email: z.string().email("Please provide a valid email"),
    phone: z.string().min(10).max(15),
    college: z.string().min(1, "College ID is required"),
    course: z.string().optional(),
    message: z.string().max(1000).optional(),
    source: z.string().default("website"),
  }),
});

export const updateLeadSchema = z.object({
  body: z.object({
    status: z.enum(["new", "contacted", "interested", "admitted", "not_interested"]).optional(),
    assignedTo: z.string().optional(),
    followUpDate: z.string().datetime().optional(),
    notes: z.string().max(2000).optional(),
  }),
});

export const getLeadsQuerySchema = z.object({
  query: z.object({
    page: z.string().optional(),
    limit: z.string().optional(),
    status: z.enum(["new", "contacted", "interested", "admitted", "not_interested"]).optional(),
    college: z.string().optional(),
    search: z.string().optional(),
    sortBy: z.string().optional(),
    sortOrder: z.enum(["asc", "desc"]).optional(),
  }),
});
