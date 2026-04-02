"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExamsQuerySchema = exports.updateExamSchema = exports.createExamSchema = void 0;
const zod_1 = require("zod");
exports.createExamSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(2).max(200),
        fullName: zod_1.z.string().min(2).max(500),
        description: zod_1.z.string().min(10).max(10000),
        image: zod_1.z.string().url().optional(),
        category: zod_1.z.string().min(1),
        level: zod_1.z.enum(["national", "state", "university"]),
        conductingBody: zod_1.z.string().min(1),
        mode: zod_1.z.enum(["computer-based", "pen-paper", "both"]),
        frequency: zod_1.z.string().optional(),
        eligibility: zod_1.z.string().min(5),
        syllabus: zod_1.z.array(zod_1.z.object({ subject: zod_1.z.string(), topics: zod_1.z.array(zod_1.z.string()) })).optional(),
        examPattern: zod_1.z.array(zod_1.z.object({ section: zod_1.z.string(), questions: zod_1.z.number().min(0), marks: zod_1.z.number().min(0), duration: zod_1.z.string() })).optional(),
        importantDates: zod_1.z.array(zod_1.z.object({ event: zod_1.z.string(), date: zod_1.z.string() })).optional(),
        registrationFee: zod_1.z.object({ amount: zod_1.z.number().min(0), currency: zod_1.z.string().default("INR") }).optional(),
        website: zod_1.z.string().url().optional(),
        applicants: zod_1.z.string().optional(),
        totalMarks: zod_1.z.number().min(0).optional(),
        duration: zod_1.z.string().optional(),
        languages: zod_1.z.array(zod_1.z.string()).optional(),
        rating: zod_1.z.number().min(0).max(5).optional(),
        featured: zod_1.z.boolean().optional(),
    }),
});
exports.updateExamSchema = zod_1.z.object({
    body: exports.createExamSchema.shape.body.partial(),
});
exports.getExamsQuerySchema = zod_1.z.object({
    query: zod_1.z.object({
        page: zod_1.z.string().optional(),
        limit: zod_1.z.string().optional(),
        search: zod_1.z.string().optional(),
        category: zod_1.z.string().optional(),
        level: zod_1.z.enum(["national", "state", "university"]).optional(),
        featured: zod_1.z.string().optional(),
        sortBy: zod_1.z.string().optional(),
        sortOrder: zod_1.z.enum(["asc", "desc"]).optional(),
    }),
});
//# sourceMappingURL=exam.validation.js.map