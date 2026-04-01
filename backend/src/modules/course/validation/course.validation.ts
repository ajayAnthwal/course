import { z } from "zod";

export const createCourseSchema = z.object({
  body: z.object({
    name: z.string().min(2).max(300),
    shortName: z.string().optional(),
    description: z.string().min(10).max(10000),
    image: z.string().url().optional(),
    category: z.string().min(1),
    level: z.enum(["undergraduate", "postgraduate", "diploma", "doctorate", "certificate"]),
    duration: z.string().min(1),
    durationYears: z.number().min(0.5).max(10),
    eligibility: z.string().min(5),
    admissionProcess: z.string().optional(),
    syllabus: z.array(z.object({ semester: z.string(), subjects: z.array(z.string()) })).optional(),
    careerOpportunities: z.array(z.string()).optional(),
    averageSalary: z.object({ min: z.number().min(0), max: z.number().min(0), currency: z.string().default("INR") }).optional(),
    topRecruiters: z.array(z.string()).optional(),
    fees: z.object({ min: z.number().min(0), max: z.number().min(0), currency: z.string().default("INR") }).optional(),
    entranceExams: z.array(z.string()).optional(),
    specializations: z.array(z.string()).optional(),
    collegeCount: z.number().min(0).optional(),
    rating: z.number().min(0).max(5).optional(),
    featured: z.boolean().optional(),
  }),
});

export const updateCourseSchema = z.object({
  body: createCourseSchema.shape.body.partial(),
});

export const getCoursesQuerySchema = z.object({
  query: z.object({
    page: z.string().optional(),
    limit: z.string().optional(),
    search: z.string().optional(),
    category: z.string().optional(),
    level: z.enum(["undergraduate", "postgraduate", "diploma", "doctorate", "certificate"]).optional(),
    featured: z.string().optional(),
    sortBy: z.string().optional(),
    sortOrder: z.enum(["asc", "desc"]).optional(),
  }),
});
