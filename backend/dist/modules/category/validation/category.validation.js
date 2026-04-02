"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategoriesQuerySchema = exports.updateCategorySchema = exports.createCategorySchema = void 0;
const zod_1 = require("zod");
exports.createCategorySchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1).max(100),
        description: zod_1.z.string().max(500).optional(),
        icon: zod_1.z.string().optional(),
        color: zod_1.z.string().optional(),
        count: zod_1.z.number().min(0).optional(),
    }),
});
exports.updateCategorySchema = zod_1.z.object({
    body: exports.createCategorySchema.shape.body.partial(),
});
exports.getCategoriesQuerySchema = zod_1.z.object({
    query: zod_1.z.object({
        page: zod_1.z.string().optional(),
        limit: zod_1.z.string().optional(),
        search: zod_1.z.string().optional(),
    }),
});
//# sourceMappingURL=category.validation.js.map