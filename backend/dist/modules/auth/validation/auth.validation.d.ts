import { z } from "zod";
export declare const registerSchema: z.ZodObject<{
    body: z.ZodEffects<z.ZodObject<{
        name: z.ZodString;
        email: z.ZodString;
        password: z.ZodString;
        confirmPassword: z.ZodString;
        role: z.ZodDefault<z.ZodEnum<["student", "college"]>>;
        phone: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        email: string;
        password: string;
        role: "student" | "college";
        confirmPassword: string;
        phone?: string | undefined;
    }, {
        name: string;
        email: string;
        password: string;
        confirmPassword: string;
        role?: "student" | "college" | undefined;
        phone?: string | undefined;
    }>, {
        name: string;
        email: string;
        password: string;
        role: "student" | "college";
        confirmPassword: string;
        phone?: string | undefined;
    }, {
        name: string;
        email: string;
        password: string;
        confirmPassword: string;
        role?: "student" | "college" | undefined;
        phone?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        name: string;
        email: string;
        password: string;
        role: "student" | "college";
        confirmPassword: string;
        phone?: string | undefined;
    };
}, {
    body: {
        name: string;
        email: string;
        password: string;
        confirmPassword: string;
        role?: "student" | "college" | undefined;
        phone?: string | undefined;
    };
}>;
export declare const loginSchema: z.ZodObject<{
    body: z.ZodObject<{
        email: z.ZodString;
        password: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        email: string;
        password: string;
    }, {
        email: string;
        password: string;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        email: string;
        password: string;
    };
}, {
    body: {
        email: string;
        password: string;
    };
}>;
//# sourceMappingURL=auth.validation.d.ts.map