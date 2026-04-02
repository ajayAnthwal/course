import { z } from "zod";
export declare const createLeadSchema: z.ZodObject<{
    body: z.ZodObject<{
        name: z.ZodString;
        email: z.ZodString;
        phone: z.ZodString;
        college: z.ZodString;
        course: z.ZodOptional<z.ZodString>;
        message: z.ZodOptional<z.ZodString>;
        source: z.ZodDefault<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        college: string;
        name: string;
        email: string;
        phone: string;
        source: string;
        message?: string | undefined;
        course?: string | undefined;
    }, {
        college: string;
        name: string;
        email: string;
        phone: string;
        message?: string | undefined;
        source?: string | undefined;
        course?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        college: string;
        name: string;
        email: string;
        phone: string;
        source: string;
        message?: string | undefined;
        course?: string | undefined;
    };
}, {
    body: {
        college: string;
        name: string;
        email: string;
        phone: string;
        message?: string | undefined;
        source?: string | undefined;
        course?: string | undefined;
    };
}>;
export declare const updateLeadSchema: z.ZodObject<{
    body: z.ZodObject<{
        status: z.ZodOptional<z.ZodEnum<["new", "contacted", "interested", "admitted", "not_interested"]>>;
        assignedTo: z.ZodOptional<z.ZodString>;
        followUpDate: z.ZodOptional<z.ZodString>;
        notes: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        status?: "new" | "contacted" | "interested" | "admitted" | "not_interested" | undefined;
        assignedTo?: string | undefined;
        followUpDate?: string | undefined;
        notes?: string | undefined;
    }, {
        status?: "new" | "contacted" | "interested" | "admitted" | "not_interested" | undefined;
        assignedTo?: string | undefined;
        followUpDate?: string | undefined;
        notes?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        status?: "new" | "contacted" | "interested" | "admitted" | "not_interested" | undefined;
        assignedTo?: string | undefined;
        followUpDate?: string | undefined;
        notes?: string | undefined;
    };
}, {
    body: {
        status?: "new" | "contacted" | "interested" | "admitted" | "not_interested" | undefined;
        assignedTo?: string | undefined;
        followUpDate?: string | undefined;
        notes?: string | undefined;
    };
}>;
export declare const getLeadsQuerySchema: z.ZodObject<{
    query: z.ZodObject<{
        page: z.ZodOptional<z.ZodString>;
        limit: z.ZodOptional<z.ZodString>;
        status: z.ZodOptional<z.ZodEnum<["new", "contacted", "interested", "admitted", "not_interested"]>>;
        college: z.ZodOptional<z.ZodString>;
        search: z.ZodOptional<z.ZodString>;
        sortBy: z.ZodOptional<z.ZodString>;
        sortOrder: z.ZodOptional<z.ZodEnum<["asc", "desc"]>>;
    }, "strip", z.ZodTypeAny, {
        college?: string | undefined;
        search?: string | undefined;
        limit?: string | undefined;
        status?: "new" | "contacted" | "interested" | "admitted" | "not_interested" | undefined;
        page?: string | undefined;
        sortBy?: string | undefined;
        sortOrder?: "asc" | "desc" | undefined;
    }, {
        college?: string | undefined;
        search?: string | undefined;
        limit?: string | undefined;
        status?: "new" | "contacted" | "interested" | "admitted" | "not_interested" | undefined;
        page?: string | undefined;
        sortBy?: string | undefined;
        sortOrder?: "asc" | "desc" | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    query: {
        college?: string | undefined;
        search?: string | undefined;
        limit?: string | undefined;
        status?: "new" | "contacted" | "interested" | "admitted" | "not_interested" | undefined;
        page?: string | undefined;
        sortBy?: string | undefined;
        sortOrder?: "asc" | "desc" | undefined;
    };
}, {
    query: {
        college?: string | undefined;
        search?: string | undefined;
        limit?: string | undefined;
        status?: "new" | "contacted" | "interested" | "admitted" | "not_interested" | undefined;
        page?: string | undefined;
        sortBy?: string | undefined;
        sortOrder?: "asc" | "desc" | undefined;
    };
}>;
//# sourceMappingURL=lead.validation.d.ts.map