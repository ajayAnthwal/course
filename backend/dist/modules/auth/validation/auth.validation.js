"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
exports.registerSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string()
            .min(2, "Name must be at least 2 characters")
            .max(100, "Name cannot exceed 100 characters"),
        email: zod_1.z.string().email("Please provide a valid email"),
        password: zod_1.z
            .string()
            .min(8, "Password must be at least 8 characters")
            .max(100, "Password cannot exceed 100 characters")
            .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Password must contain at least one uppercase letter, one lowercase letter, and one number"),
        confirmPassword: zod_1.z.string(),
        role: zod_1.z.enum(["student", "college"]).default("student"),
        phone: zod_1.z.string().optional(),
    }).refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    }),
});
exports.loginSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email("Please provide a valid email"),
        password: zod_1.z.string().min(1, "Password is required"),
    }),
});
//# sourceMappingURL=auth.validation.js.map