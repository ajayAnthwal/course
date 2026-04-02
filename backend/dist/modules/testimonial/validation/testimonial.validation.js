"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTestimonialSchema = exports.createTestimonialSchema = void 0;
const zod_1 = require("zod");
exports.createTestimonialSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1).max(100),
        role: zod_1.z.string().min(1).max(100),
        rating: zod_1.z.number().min(1).max(5).optional(),
        content: zod_1.z.string().min(10).max(1000),
        college: zod_1.z.string().optional(),
    }),
});
exports.updateTestimonialSchema = zod_1.z.object({
    body: exports.createTestimonialSchema.shape.body.partial(),
});
//# sourceMappingURL=testimonial.validation.js.map