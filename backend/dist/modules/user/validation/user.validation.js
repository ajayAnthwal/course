"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsersQuerySchema = exports.changePasswordSchema = exports.updateUserSchema = void 0;
const zod_1 = require("zod");
exports.updateUserSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(2).max(100).optional(),
        phone: zod_1.z.string().optional(),
        avatar: zod_1.z.string().url().optional(),
    }),
});
exports.changePasswordSchema = zod_1.z.object({
    body: zod_1.z.object({
        currentPassword: zod_1.z.string().min(8),
        newPassword: zod_1.z.string().min(8).max(100),
        confirmPassword: zod_1.z.string().min(8),
    }).refine((data) => data.newPassword === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    }),
});
exports.getUsersQuerySchema = zod_1.z.object({
    query: zod_1.z.object({
        page: zod_1.z.string().optional(),
        limit: zod_1.z.string().optional(),
        role: zod_1.z.enum(["admin", "student", "college", "teacher"]).optional(),
        search: zod_1.z.string().optional(),
        sortBy: zod_1.z.string().optional(),
        sortOrder: zod_1.z.enum(["asc", "desc"]).optional(),
    }),
});
//# sourceMappingURL=user.validation.js.map