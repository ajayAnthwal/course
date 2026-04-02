"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLeadsQuerySchema = exports.updateLeadSchema = exports.createLeadSchema = void 0;
const zod_1 = require("zod");
exports.createLeadSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(2).max(100),
        email: zod_1.z.string().email("Please provide a valid email"),
        phone: zod_1.z.string().min(10).max(15),
        college: zod_1.z.string().min(1, "College ID is required"),
        course: zod_1.z.string().optional(),
        message: zod_1.z.string().max(1000).optional(),
        source: zod_1.z.string().default("website"),
    }),
});
exports.updateLeadSchema = zod_1.z.object({
    body: zod_1.z.object({
        status: zod_1.z.enum(["new", "contacted", "interested", "admitted", "not_interested"]).optional(),
        assignedTo: zod_1.z.string().optional(),
        followUpDate: zod_1.z.string().datetime().optional(),
        notes: zod_1.z.string().max(2000).optional(),
    }),
});
exports.getLeadsQuerySchema = zod_1.z.object({
    query: zod_1.z.object({
        page: zod_1.z.string().optional(),
        limit: zod_1.z.string().optional(),
        status: zod_1.z.enum(["new", "contacted", "interested", "admitted", "not_interested"]).optional(),
        college: zod_1.z.string().optional(),
        search: zod_1.z.string().optional(),
        sortBy: zod_1.z.string().optional(),
        sortOrder: zod_1.z.enum(["asc", "desc"]).optional(),
    }),
});
//# sourceMappingURL=lead.validation.js.map