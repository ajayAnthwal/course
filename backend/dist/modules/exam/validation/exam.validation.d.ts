import { z } from "zod";
export declare const createExamSchema: z.ZodObject<{
    body: z.ZodObject<{
        name: z.ZodString;
        fullName: z.ZodString;
        description: z.ZodString;
        image: z.ZodOptional<z.ZodString>;
        category: z.ZodString;
        level: z.ZodEnum<["national", "state", "university"]>;
        conductingBody: z.ZodString;
        mode: z.ZodEnum<["computer-based", "pen-paper", "both"]>;
        frequency: z.ZodOptional<z.ZodString>;
        eligibility: z.ZodString;
        syllabus: z.ZodOptional<z.ZodArray<z.ZodObject<{
            subject: z.ZodString;
            topics: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            subject: string;
            topics: string[];
        }, {
            subject: string;
            topics: string[];
        }>, "many">>;
        examPattern: z.ZodOptional<z.ZodArray<z.ZodObject<{
            section: z.ZodString;
            questions: z.ZodNumber;
            marks: z.ZodNumber;
            duration: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            duration: string;
            section: string;
            questions: number;
            marks: number;
        }, {
            duration: string;
            section: string;
            questions: number;
            marks: number;
        }>, "many">>;
        importantDates: z.ZodOptional<z.ZodArray<z.ZodObject<{
            event: z.ZodString;
            date: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            date: string;
            event: string;
        }, {
            date: string;
            event: string;
        }>, "many">>;
        registrationFee: z.ZodOptional<z.ZodObject<{
            amount: z.ZodNumber;
            currency: z.ZodDefault<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            currency: string;
            amount: number;
        }, {
            amount: number;
            currency?: string | undefined;
        }>>;
        website: z.ZodOptional<z.ZodString>;
        applicants: z.ZodOptional<z.ZodString>;
        totalMarks: z.ZodOptional<z.ZodNumber>;
        duration: z.ZodOptional<z.ZodString>;
        languages: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        rating: z.ZodOptional<z.ZodNumber>;
        featured: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        description: string;
        level: "state" | "national" | "university";
        category: string;
        eligibility: string;
        fullName: string;
        conductingBody: string;
        mode: "computer-based" | "pen-paper" | "both";
        rating?: number | undefined;
        website?: string | undefined;
        featured?: boolean | undefined;
        duration?: string | undefined;
        image?: string | undefined;
        syllabus?: {
            subject: string;
            topics: string[];
        }[] | undefined;
        frequency?: string | undefined;
        examPattern?: {
            duration: string;
            section: string;
            questions: number;
            marks: number;
        }[] | undefined;
        importantDates?: {
            date: string;
            event: string;
        }[] | undefined;
        registrationFee?: {
            currency: string;
            amount: number;
        } | undefined;
        applicants?: string | undefined;
        totalMarks?: number | undefined;
        languages?: string[] | undefined;
    }, {
        name: string;
        description: string;
        level: "state" | "national" | "university";
        category: string;
        eligibility: string;
        fullName: string;
        conductingBody: string;
        mode: "computer-based" | "pen-paper" | "both";
        rating?: number | undefined;
        website?: string | undefined;
        featured?: boolean | undefined;
        duration?: string | undefined;
        image?: string | undefined;
        syllabus?: {
            subject: string;
            topics: string[];
        }[] | undefined;
        frequency?: string | undefined;
        examPattern?: {
            duration: string;
            section: string;
            questions: number;
            marks: number;
        }[] | undefined;
        importantDates?: {
            date: string;
            event: string;
        }[] | undefined;
        registrationFee?: {
            amount: number;
            currency?: string | undefined;
        } | undefined;
        applicants?: string | undefined;
        totalMarks?: number | undefined;
        languages?: string[] | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        name: string;
        description: string;
        level: "state" | "national" | "university";
        category: string;
        eligibility: string;
        fullName: string;
        conductingBody: string;
        mode: "computer-based" | "pen-paper" | "both";
        rating?: number | undefined;
        website?: string | undefined;
        featured?: boolean | undefined;
        duration?: string | undefined;
        image?: string | undefined;
        syllabus?: {
            subject: string;
            topics: string[];
        }[] | undefined;
        frequency?: string | undefined;
        examPattern?: {
            duration: string;
            section: string;
            questions: number;
            marks: number;
        }[] | undefined;
        importantDates?: {
            date: string;
            event: string;
        }[] | undefined;
        registrationFee?: {
            currency: string;
            amount: number;
        } | undefined;
        applicants?: string | undefined;
        totalMarks?: number | undefined;
        languages?: string[] | undefined;
    };
}, {
    body: {
        name: string;
        description: string;
        level: "state" | "national" | "university";
        category: string;
        eligibility: string;
        fullName: string;
        conductingBody: string;
        mode: "computer-based" | "pen-paper" | "both";
        rating?: number | undefined;
        website?: string | undefined;
        featured?: boolean | undefined;
        duration?: string | undefined;
        image?: string | undefined;
        syllabus?: {
            subject: string;
            topics: string[];
        }[] | undefined;
        frequency?: string | undefined;
        examPattern?: {
            duration: string;
            section: string;
            questions: number;
            marks: number;
        }[] | undefined;
        importantDates?: {
            date: string;
            event: string;
        }[] | undefined;
        registrationFee?: {
            amount: number;
            currency?: string | undefined;
        } | undefined;
        applicants?: string | undefined;
        totalMarks?: number | undefined;
        languages?: string[] | undefined;
    };
}>;
export declare const updateExamSchema: z.ZodObject<{
    body: z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        fullName: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodString>;
        image: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        category: z.ZodOptional<z.ZodString>;
        level: z.ZodOptional<z.ZodEnum<["national", "state", "university"]>>;
        conductingBody: z.ZodOptional<z.ZodString>;
        mode: z.ZodOptional<z.ZodEnum<["computer-based", "pen-paper", "both"]>>;
        frequency: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        eligibility: z.ZodOptional<z.ZodString>;
        syllabus: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodObject<{
            subject: z.ZodString;
            topics: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            subject: string;
            topics: string[];
        }, {
            subject: string;
            topics: string[];
        }>, "many">>>;
        examPattern: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodObject<{
            section: z.ZodString;
            questions: z.ZodNumber;
            marks: z.ZodNumber;
            duration: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            duration: string;
            section: string;
            questions: number;
            marks: number;
        }, {
            duration: string;
            section: string;
            questions: number;
            marks: number;
        }>, "many">>>;
        importantDates: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodObject<{
            event: z.ZodString;
            date: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            date: string;
            event: string;
        }, {
            date: string;
            event: string;
        }>, "many">>>;
        registrationFee: z.ZodOptional<z.ZodOptional<z.ZodObject<{
            amount: z.ZodNumber;
            currency: z.ZodDefault<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            currency: string;
            amount: number;
        }, {
            amount: number;
            currency?: string | undefined;
        }>>>;
        website: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        applicants: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        totalMarks: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
        duration: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        languages: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
        rating: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
        featured: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
    }, "strip", z.ZodTypeAny, {
        name?: string | undefined;
        description?: string | undefined;
        rating?: number | undefined;
        website?: string | undefined;
        featured?: boolean | undefined;
        duration?: string | undefined;
        level?: "state" | "national" | "university" | undefined;
        image?: string | undefined;
        category?: string | undefined;
        eligibility?: string | undefined;
        syllabus?: {
            subject: string;
            topics: string[];
        }[] | undefined;
        fullName?: string | undefined;
        conductingBody?: string | undefined;
        mode?: "computer-based" | "pen-paper" | "both" | undefined;
        frequency?: string | undefined;
        examPattern?: {
            duration: string;
            section: string;
            questions: number;
            marks: number;
        }[] | undefined;
        importantDates?: {
            date: string;
            event: string;
        }[] | undefined;
        registrationFee?: {
            currency: string;
            amount: number;
        } | undefined;
        applicants?: string | undefined;
        totalMarks?: number | undefined;
        languages?: string[] | undefined;
    }, {
        name?: string | undefined;
        description?: string | undefined;
        rating?: number | undefined;
        website?: string | undefined;
        featured?: boolean | undefined;
        duration?: string | undefined;
        level?: "state" | "national" | "university" | undefined;
        image?: string | undefined;
        category?: string | undefined;
        eligibility?: string | undefined;
        syllabus?: {
            subject: string;
            topics: string[];
        }[] | undefined;
        fullName?: string | undefined;
        conductingBody?: string | undefined;
        mode?: "computer-based" | "pen-paper" | "both" | undefined;
        frequency?: string | undefined;
        examPattern?: {
            duration: string;
            section: string;
            questions: number;
            marks: number;
        }[] | undefined;
        importantDates?: {
            date: string;
            event: string;
        }[] | undefined;
        registrationFee?: {
            amount: number;
            currency?: string | undefined;
        } | undefined;
        applicants?: string | undefined;
        totalMarks?: number | undefined;
        languages?: string[] | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        name?: string | undefined;
        description?: string | undefined;
        rating?: number | undefined;
        website?: string | undefined;
        featured?: boolean | undefined;
        duration?: string | undefined;
        level?: "state" | "national" | "university" | undefined;
        image?: string | undefined;
        category?: string | undefined;
        eligibility?: string | undefined;
        syllabus?: {
            subject: string;
            topics: string[];
        }[] | undefined;
        fullName?: string | undefined;
        conductingBody?: string | undefined;
        mode?: "computer-based" | "pen-paper" | "both" | undefined;
        frequency?: string | undefined;
        examPattern?: {
            duration: string;
            section: string;
            questions: number;
            marks: number;
        }[] | undefined;
        importantDates?: {
            date: string;
            event: string;
        }[] | undefined;
        registrationFee?: {
            currency: string;
            amount: number;
        } | undefined;
        applicants?: string | undefined;
        totalMarks?: number | undefined;
        languages?: string[] | undefined;
    };
}, {
    body: {
        name?: string | undefined;
        description?: string | undefined;
        rating?: number | undefined;
        website?: string | undefined;
        featured?: boolean | undefined;
        duration?: string | undefined;
        level?: "state" | "national" | "university" | undefined;
        image?: string | undefined;
        category?: string | undefined;
        eligibility?: string | undefined;
        syllabus?: {
            subject: string;
            topics: string[];
        }[] | undefined;
        fullName?: string | undefined;
        conductingBody?: string | undefined;
        mode?: "computer-based" | "pen-paper" | "both" | undefined;
        frequency?: string | undefined;
        examPattern?: {
            duration: string;
            section: string;
            questions: number;
            marks: number;
        }[] | undefined;
        importantDates?: {
            date: string;
            event: string;
        }[] | undefined;
        registrationFee?: {
            amount: number;
            currency?: string | undefined;
        } | undefined;
        applicants?: string | undefined;
        totalMarks?: number | undefined;
        languages?: string[] | undefined;
    };
}>;
export declare const getExamsQuerySchema: z.ZodObject<{
    query: z.ZodObject<{
        page: z.ZodOptional<z.ZodString>;
        limit: z.ZodOptional<z.ZodString>;
        search: z.ZodOptional<z.ZodString>;
        category: z.ZodOptional<z.ZodString>;
        level: z.ZodOptional<z.ZodEnum<["national", "state", "university"]>>;
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
        level?: "state" | "national" | "university" | undefined;
        category?: string | undefined;
    }, {
        search?: string | undefined;
        limit?: string | undefined;
        page?: string | undefined;
        sortBy?: string | undefined;
        sortOrder?: "asc" | "desc" | undefined;
        featured?: string | undefined;
        level?: "state" | "national" | "university" | undefined;
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
        level?: "state" | "national" | "university" | undefined;
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
        level?: "state" | "national" | "university" | undefined;
        category?: string | undefined;
    };
}>;
//# sourceMappingURL=exam.validation.d.ts.map