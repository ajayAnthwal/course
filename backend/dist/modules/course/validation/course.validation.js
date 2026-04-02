"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCoursesQuerySchema = exports.updateCourseSchema = exports.createCourseSchema = void 0;
const zod_1 = require("zod");
exports.createCourseSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(2).max(300),
        shortName: zod_1.z.string().optional(),
        description: zod_1.z.string().min(10).max(10000),
        image: zod_1.z.string().url().optional(),
        category: zod_1.z.string().min(1),
        level: zod_1.z.enum(["undergraduate", "postgraduate", "diploma", "doctorate", "certificate"]),
        duration: zod_1.z.string().min(1),
        durationYears: zod_1.z.number().min(0.5).max(10),
        eligibility: zod_1.z.string().min(5),
        admissionProcess: zod_1.z.string().optional(),
        syllabus: zod_1.z.array(zod_1.z.object({ semester: zod_1.z.string(), subjects: zod_1.z.array(zod_1.z.string()) })).optional(),
        careerOpportunities: zod_1.z.array(zod_1.z.string()).optional(),
        averageSalary: zod_1.z.object({ min: zod_1.z.number().min(0), max: zod_1.z.number().min(0), currency: zod_1.z.string().default("INR") }).optional(),
        topRecruiters: zod_1.z.array(zod_1.z.string()).optional(),
        fees: zod_1.z.object({ min: zod_1.z.number().min(0), max: zod_1.z.number().min(0), currency: zod_1.z.string().default("INR") }).optional(),
        entranceExams: zod_1.z.array(zod_1.z.string()).optional(),
        specializations: zod_1.z.array(zod_1.z.string()).optional(),
        collegeCount: zod_1.z.number().min(0).optional(),
        rating: zod_1.z.number().min(0).max(5).optional(),
        featured: zod_1.z.boolean().optional(),
    }),
});
exports.updateCourseSchema = zod_1.z.object({
    body: exports.createCourseSchema.shape.body.partial(),
});
exports.getCoursesQuerySchema = zod_1.z.object({
    query: zod_1.z.object({
        page: zod_1.z.string().optional(),
        limit: zod_1.z.string().optional(),
        search: zod_1.z.string().optional(),
        category: zod_1.z.string().optional(),
        level: zod_1.z.enum(["undergraduate", "postgraduate", "diploma", "doctorate", "certificate"]).optional(),
        featured: zod_1.z.string().optional(),
        sortBy: zod_1.z.string().optional(),
        sortOrder: zod_1.z.enum(["asc", "desc"]).optional(),
    }),
});
//# sourceMappingURL=course.validation.js.map