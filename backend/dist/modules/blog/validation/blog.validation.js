"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBlogsQuerySchema = exports.updateBlogSchema = exports.createBlogSchema = void 0;
const zod_1 = require("zod");
exports.createBlogSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(5).max(500),
        excerpt: zod_1.z.string().min(10).max(500),
        content: zod_1.z.string().min(20).max(50000),
        image: zod_1.z.string().optional(),
        category: zod_1.z.string().min(1),
        author: zod_1.z.string().min(1),
        authorAvatar: zod_1.z.string().optional(),
        tags: zod_1.z.array(zod_1.z.string()).optional(),
        readTime: zod_1.z.string().optional(),
        featured: zod_1.z.boolean().optional(),
        publishedAt: zod_1.z.string().datetime().optional(),
    }),
});
exports.updateBlogSchema = zod_1.z.object({
    body: exports.createBlogSchema.shape.body.partial(),
});
exports.getBlogsQuerySchema = zod_1.z.object({
    query: zod_1.z.object({
        page: zod_1.z.string().optional(),
        limit: zod_1.z.string().optional(),
        search: zod_1.z.string().optional(),
        category: zod_1.z.string().optional(),
        featured: zod_1.z.string().optional(),
        sortBy: zod_1.z.string().optional(),
        sortOrder: zod_1.z.enum(["asc", "desc"]).optional(),
    }),
});
//# sourceMappingURL=blog.validation.js.map