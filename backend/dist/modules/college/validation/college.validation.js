"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCollegesQuerySchema = exports.updateCollegeSchema = exports.createCollegeSchema = void 0;
const zod_1 = require("zod");
exports.createCollegeSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(2).max(200),
        description: zod_1.z.string().min(10).max(5000),
        logo: zod_1.z.string().url().optional(),
        coverImage: zod_1.z.string().url().optional(),
        location: zod_1.z.object({
            city: zod_1.z.string().min(1),
            state: zod_1.z.string().min(1),
            country: zod_1.z.string().default("India"),
            address: zod_1.z.string().optional(),
            pincode: zod_1.z.string().optional(),
        }),
        type: zod_1.z.enum(["government", "private", "deemed", "autonomous"]),
        establishedYear: zod_1.z.number().min(1800).max(new Date().getFullYear()),
        approvedBy: zod_1.z.array(zod_1.z.string()).optional(),
        courses: zod_1.z
            .array(zod_1.z.object({
            name: zod_1.z.string().min(1),
            duration: zod_1.z.string().optional(),
            fees: zod_1.z
                .object({
                min: zod_1.z.number().min(0),
                max: zod_1.z.number().min(0),
                currency: zod_1.z.string().default("INR"),
            })
                .optional(),
            level: zod_1.z.enum(["undergraduate", "postgraduate", "diploma", "doctorate"]).optional(),
        }))
            .optional(),
        facilities: zod_1.z.array(zod_1.z.string()).optional(),
        entranceExams: zod_1.z.array(zod_1.z.string()).optional(),
        website: zod_1.z.string().url().optional(),
        email: zod_1.z.string().email().optional(),
        phone: zod_1.z.string().optional(),
        featured: zod_1.z.boolean().optional(),
    }),
});
exports.updateCollegeSchema = zod_1.z.object({
    body: exports.createCollegeSchema.shape.body.partial(),
});
exports.getCollegesQuerySchema = zod_1.z.object({
    query: zod_1.z.object({
        page: zod_1.z.string().optional(),
        limit: zod_1.z.string().optional(),
        search: zod_1.z.string().optional(),
        city: zod_1.z.string().optional(),
        state: zod_1.z.string().optional(),
        type: zod_1.z.enum(["government", "private", "deemed", "autonomous"]).optional(),
        course: zod_1.z.string().optional(),
        minFees: zod_1.z.string().optional(),
        maxFees: zod_1.z.string().optional(),
        minRating: zod_1.z.string().optional(),
        featured: zod_1.z.string().optional(),
        sortBy: zod_1.z.string().optional(),
        sortOrder: zod_1.z.enum(["asc", "desc"]).optional(),
    }),
});
//# sourceMappingURL=college.validation.js.map