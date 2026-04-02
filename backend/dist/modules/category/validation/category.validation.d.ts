import { z } from "zod";
export declare const createCategorySchema: z.ZodObject<{
    body: z.ZodObject<{
        name: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        icon: z.ZodOptional<z.ZodString>;
        color: z.ZodOptional<z.ZodString>;
        count: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        description?: string | undefined;
        count?: number | undefined;
        icon?: string | undefined;
        color?: string | undefined;
    }, {
        name: string;
        description?: string | undefined;
        count?: number | undefined;
        icon?: string | undefined;
        color?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        name: string;
        description?: string | undefined;
        count?: number | undefined;
        icon?: string | undefined;
        color?: string | undefined;
    };
}, {
    body: {
        name: string;
        description?: string | undefined;
        count?: number | undefined;
        icon?: string | undefined;
        color?: string | undefined;
    };
}>;
export declare const updateCategorySchema: z.ZodObject<{
    body: z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        icon: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        color: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        count: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    }, "strip", z.ZodTypeAny, {
        name?: string | undefined;
        description?: string | undefined;
        count?: number | undefined;
        icon?: string | undefined;
        color?: string | undefined;
    }, {
        name?: string | undefined;
        description?: string | undefined;
        count?: number | undefined;
        icon?: string | undefined;
        color?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        name?: string | undefined;
        description?: string | undefined;
        count?: number | undefined;
        icon?: string | undefined;
        color?: string | undefined;
    };
}, {
    body: {
        name?: string | undefined;
        description?: string | undefined;
        count?: number | undefined;
        icon?: string | undefined;
        color?: string | undefined;
    };
}>;
export declare const getCategoriesQuerySchema: z.ZodObject<{
    query: z.ZodObject<{
        page: z.ZodOptional<z.ZodString>;
        limit: z.ZodOptional<z.ZodString>;
        search: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        search?: string | undefined;
        limit?: string | undefined;
        page?: string | undefined;
    }, {
        search?: string | undefined;
        limit?: string | undefined;
        page?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    query: {
        search?: string | undefined;
        limit?: string | undefined;
        page?: string | undefined;
    };
}, {
    query: {
        search?: string | undefined;
        limit?: string | undefined;
        page?: string | undefined;
    };
}>;
//# sourceMappingURL=category.validation.d.ts.map