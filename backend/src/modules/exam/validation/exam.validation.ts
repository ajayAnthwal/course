import { z } from "zod";

export const createExamSchema = z.object({
  body: z.object({
    name: z.string().min(2).max(200),
    fullName: z.string().min(2).max(500),
    description: z.string().min(10).max(10000),
    image: z.string().url().optional(),
    category: z.string().min(1),
    level: z.enum(["national", "state", "university"]),
    conductingBody: z.string().min(1),
    mode: z.enum(["computer-based", "pen-paper", "both"]),
    frequency: z.string().optional(),
    eligibility: z.string().min(5),
    syllabus: z.array(z.object({ subject: z.string(), topics: z.array(z.string()) })).optional(),
    examPattern: z.array(z.object({ section: z.string(), questions: z.number().min(0), marks: z.number().min(0), duration: z.string() })).optional(),
    importantDates: z.array(z.object({ event: z.string(), date: z.string() })).optional(),
    registrationFee: z.object({ amount: z.number().min(0), currency: z.string().default("INR") }).optional(),
    website: z.string().url().optional(),
    applicants: z.string().optional(),
    totalMarks: z.number().min(0).optional(),
    duration: z.string().optional(),
    languages: z.array(z.string()).optional(),
    rating: z.number().min(0).max(5).optional(),
    featured: z.boolean().optional(),
  }),
});

export const updateExamSchema = z.object({
  body: createExamSchema.shape.body.partial(),
});

export const getExamsQuerySchema = z.object({
  query: z.object({
    page: z.string().optional(),
    limit: z.string().optional(),
    search: z.string().optional(),
    category: z.string().optional(),
    level: z.enum(["national", "state", "university"]).optional(),
    featured: z.string().optional(),
    sortBy: z.string().optional(),
    sortOrder: z.enum(["asc", "desc"]).optional(),
  }),
});
