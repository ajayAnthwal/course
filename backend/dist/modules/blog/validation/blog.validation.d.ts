import { z } from "zod";
export declare const createBlogSchema: z.ZodObject<{
    body: z.ZodObject<{
        title: z.ZodString;
        excerpt: z.ZodString;
        content: z.ZodString;
        image: z.ZodOptional<z.ZodString>;
        category: z.ZodString;
        author: z.ZodString;
        authorAvatar: z.ZodOptional<z.ZodString>;
        tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        readTime: z.ZodOptional<z.ZodString>;
        featured: z.ZodOptional<z.ZodBoolean>;
        publishedAt: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        category: string;
        title: string;
        excerpt: string;
        content: string;
        author: string;
        featured?: boolean | undefined;
        image?: string | undefined;
        authorAvatar?: string | undefined;
        tags?: string[] | undefined;
        readTime?: string | undefined;
        publishedAt?: string | undefined;
    }, {
        category: string;
        title: string;
        excerpt: string;
        content: string;
        author: string;
        featured?: boolean | undefined;
        image?: string | undefined;
        authorAvatar?: string | undefined;
        tags?: string[] | undefined;
        readTime?: string | undefined;
        publishedAt?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        category: string;
        title: string;
        excerpt: string;
        content: string;
        author: string;
        featured?: boolean | undefined;
        image?: string | undefined;
        authorAvatar?: string | undefined;
        tags?: string[] | undefined;
        readTime?: string | undefined;
        publishedAt?: string | undefined;
    };
}, {
    body: {
        category: string;
        title: string;
        excerpt: string;
        content: string;
        author: string;
        featured?: boolean | undefined;
        image?: string | undefined;
        authorAvatar?: string | undefined;
        tags?: string[] | undefined;
        readTime?: string | undefined;
        publishedAt?: string | undefined;
    };
}>;
export declare const updateBlogSchema: z.ZodObject<{
    body: z.ZodObject<{
        title: z.ZodOptional<z.ZodString>;
        excerpt: z.ZodOptional<z.ZodString>;
        content: z.ZodOptional<z.ZodString>;
        image: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        category: z.ZodOptional<z.ZodString>;
        author: z.ZodOptional<z.ZodString>;
        authorAvatar: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        tags: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
        readTime: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        featured: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
        publishedAt: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        featured?: boolean | undefined;
        image?: string | undefined;
        category?: string | undefined;
        title?: string | undefined;
        excerpt?: string | undefined;
        content?: string | undefined;
        author?: string | undefined;
        authorAvatar?: string | undefined;
        tags?: string[] | undefined;
        readTime?: string | undefined;
        publishedAt?: string | undefined;
    }, {
        featured?: boolean | undefined;
        image?: string | undefined;
        category?: string | undefined;
        title?: string | undefined;
        excerpt?: string | undefined;
        content?: string | undefined;
        author?: string | undefined;
        authorAvatar?: string | undefined;
        tags?: string[] | undefined;
        readTime?: string | undefined;
        publishedAt?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        featured?: boolean | undefined;
        image?: string | undefined;
        category?: string | undefined;
        title?: string | undefined;
        excerpt?: string | undefined;
        content?: string | undefined;
        author?: string | undefined;
        authorAvatar?: string | undefined;
        tags?: string[] | undefined;
        readTime?: string | undefined;
        publishedAt?: string | undefined;
    };
}, {
    body: {
        featured?: boolean | undefined;
        image?: string | undefined;
        category?: string | undefined;
        title?: string | undefined;
        excerpt?: string | undefined;
        content?: string | undefined;
        author?: string | undefined;
        authorAvatar?: string | undefined;
        tags?: string[] | undefined;
        readTime?: string | undefined;
        publishedAt?: string | undefined;
    };
}>;
export declare const getBlogsQuerySchema: z.ZodObject<{
    query: z.ZodObject<{
        page: z.ZodOptional<z.ZodString>;
        limit: z.ZodOptional<z.ZodString>;
        search: z.ZodOptional<z.ZodString>;
        category: z.ZodOptional<z.ZodString>;
        featured: z.ZodOptional<z.ZodString>;
        sortBy: z.ZodOptional<z.ZodString>;
        sortOrder: z.ZodOptional<z.ZodEnum<["asc", "desc"]>>;
    }, "strip", z.ZodTypeAny, {
        search?: string | undefined;
        limit?: string | undefined;
        page?: string | undefined;
        sortBy?: string | undefined;
        sortOrder?: "asc" | "desc" | undefined;
        featured?: string | undefined;
        category?: string | undefined;
    }, {
        search?: string | undefined;
        limit?: string | undefined;
        page?: string | undefined;
        sortBy?: string | undefined;
        sortOrder?: "asc" | "desc" | undefined;
        featured?: string | undefined;
        category?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    query: {
        search?: string | undefined;
        limit?: string | undefined;
        page?: string | undefined;
        sortBy?: string | undefined;
        sortOrder?: "asc" | "desc" | undefined;
        featured?: string | undefined;
        category?: string | undefined;
    };
}, {
    query: {
        search?: string | undefined;
        limit?: string | undefined;
        page?: string | undefined;
        sortBy?: string | undefined;
        sortOrder?: "asc" | "desc" | undefined;
        featured?: string | undefined;
        category?: string | undefined;
    };
}>;
//# sourceMappingURL=blog.validation.d.ts.map