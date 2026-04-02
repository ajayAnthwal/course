import { z } from "zod";
export declare const updateUserSchema: z.ZodObject<{
    body: z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        phone: z.ZodOptional<z.ZodString>;
        avatar: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        name?: string | undefined;
        phone?: string | undefined;
        avatar?: string | undefined;
    }, {
        name?: string | undefined;
        phone?: string | undefined;
        avatar?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        name?: string | undefined;
        phone?: string | undefined;
        avatar?: string | undefined;
    };
}, {
    body: {
        name?: string | undefined;
        phone?: string | undefined;
        avatar?: string | undefined;
    };
}>;
export declare const changePasswordSchema: z.ZodObject<{
    body: z.ZodEffects<z.ZodObject<{
        currentPassword: z.ZodString;
        newPassword: z.ZodString;
        confirmPassword: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        confirmPassword: string;
        currentPassword: string;
        newPassword: string;
    }, {
        confirmPassword: string;
        currentPassword: string;
        newPassword: string;
    }>, {
        confirmPassword: string;
        currentPassword: string;
        newPassword: string;
    }, {
        confirmPassword: string;
        currentPassword: string;
        newPassword: string;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        confirmPassword: string;
        currentPassword: string;
        newPassword: string;
    };
}, {
    body: {
        confirmPassword: string;
        currentPassword: string;
        newPassword: string;
    };
}>;
export declare const getUsersQuerySchema: z.ZodObject<{
    query: z.ZodObject<{
        page: z.ZodOptional<z.ZodString>;
        limit: z.ZodOptional<z.ZodString>;
        role: z.ZodOptional<z.ZodEnum<["admin", "student", "college", "teacher"]>>;
        search: z.ZodOptional<z.ZodString>;
        sortBy: z.ZodOptional<z.ZodString>;
        sortOrder: z.ZodOptional<z.ZodEnum<["asc", "desc"]>>;
    }, "strip", z.ZodTypeAny, {
        role?: "admin" | "student" | "college" | "teacher" | undefined;
        search?: string | undefined;
        limit?: string | undefined;
        page?: string | undefined;
        sortBy?: string | undefined;
        sortOrder?: "asc" | "desc" | undefined;
    }, {
        role?: "admin" | "student" | "college" | "teacher" | undefined;
        search?: string | undefined;
        limit?: string | undefined;
        page?: string | undefined;
        sortBy?: string | undefined;
        sortOrder?: "asc" | "desc" | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    query: {
        role?: "admin" | "student" | "college" | "teacher" | undefined;
        search?: string | undefined;
        limit?: string | undefined;
        page?: string | undefined;
        sortBy?: string | undefined;
        sortOrder?: "asc" | "desc" | undefined;
    };
}, {
    query: {
        role?: "admin" | "student" | "college" | "teacher" | undefined;
        search?: string | undefined;
        limit?: string | undefined;
        page?: string | undefined;
        sortBy?: string | undefined;
        sortOrder?: "asc" | "desc" | undefined;
    };
}>;
//# sourceMappingURL=user.validation.d.ts.map