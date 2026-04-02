import { z } from "zod";
export declare const createTestimonialSchema: z.ZodObject<{
    body: z.ZodObject<{
        name: z.ZodString;
        role: z.ZodString;
        rating: z.ZodOptional<z.ZodNumber>;
        content: z.ZodString;
        college: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        role: string;
        content: string;
        college?: string | undefined;
        rating?: number | undefined;
    }, {
        name: string;
        role: string;
        content: string;
        college?: string | undefined;
        rating?: number | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        name: string;
        role: string;
        content: string;
        college?: string | undefined;
        rating?: number | undefined;
    };
}, {
    body: {
        name: string;
        role: string;
        content: string;
        college?: string | undefined;
        rating?: number | undefined;
    };
}>;
export declare const updateTestimonialSchema: z.ZodObject<{
    body: z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        role: z.ZodOptional<z.ZodString>;
        rating: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
        content: z.ZodOptional<z.ZodString>;
        college: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        college?: string | undefined;
        name?: string | undefined;
        role?: string | undefined;
        rating?: number | undefined;
        content?: string | undefined;
    }, {
        college?: string | undefined;
        name?: string | undefined;
        role?: string | undefined;
        rating?: number | undefined;
        content?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        college?: string | undefined;
        name?: string | undefined;
        role?: string | undefined;
        rating?: number | undefined;
        content?: string | undefined;
    };
}, {
    body: {
        college?: string | undefined;
        name?: string | undefined;
        role?: string | undefined;
        rating?: number | undefined;
        content?: string | undefined;
    };
}>;
//# sourceMappingURL=testimonial.validation.d.ts.map