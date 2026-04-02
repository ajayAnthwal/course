import { z } from "zod";
export declare const createCourseSchema: z.ZodObject<{
    body: z.ZodObject<{
        name: z.ZodString;
        shortName: z.ZodOptional<z.ZodString>;
        description: z.ZodString;
        image: z.ZodOptional<z.ZodString>;
        category: z.ZodString;
        level: z.ZodEnum<["undergraduate", "postgraduate", "diploma", "doctorate", "certificate"]>;
        duration: z.ZodString;
        durationYears: z.ZodNumber;
        eligibility: z.ZodString;
        admissionProcess: z.ZodOptional<z.ZodString>;
        syllabus: z.ZodOptional<z.ZodArray<z.ZodObject<{
            semester: z.ZodString;
            subjects: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            semester: string;
            subjects: string[];
        }, {
            semester: string;
            subjects: string[];
        }>, "many">>;
        careerOpportunities: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        averageSalary: z.ZodOptional<z.ZodObject<{
            min: z.ZodNumber;
            max: z.ZodNumber;
            currency: z.ZodDefault<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            min: number;
            max: number;
            currency: string;
        }, {
            min: number;
            max: number;
            currency?: string | undefined;
        }>>;
        topRecruiters: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        fees: z.ZodOptional<z.ZodObject<{
            min: z.ZodNumber;
            max: z.ZodNumber;
            currency: z.ZodDefault<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            min: number;
            max: number;
            currency: string;
        }, {
            min: number;
            max: number;
            currency?: string | undefined;
        }>>;
        entranceExams: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        specializations: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        collegeCount: z.ZodOptional<z.ZodNumber>;
        rating: z.ZodOptional<z.ZodNumber>;
        featured: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        description: string;
        duration: string;
        level: "undergraduate" | "postgraduate" | "diploma" | "doctorate" | "certificate";
        category: string;
        durationYears: number;
        eligibility: string;
        rating?: number | undefined;
        entranceExams?: string[] | undefined;
        featured?: boolean | undefined;
        fees?: {
            min: number;
            max: number;
            currency: string;
        } | undefined;
        shortName?: string | undefined;
        image?: string | undefined;
        admissionProcess?: string | undefined;
        syllabus?: {
            semester: string;
            subjects: string[];
        }[] | undefined;
        careerOpportunities?: string[] | undefined;
        averageSalary?: {
            min: number;
            max: number;
            currency: string;
        } | undefined;
        topRecruiters?: string[] | undefined;
        specializations?: string[] | undefined;
        collegeCount?: number | undefined;
    }, {
        name: string;
        description: string;
        duration: string;
        level: "undergraduate" | "postgraduate" | "diploma" | "doctorate" | "certificate";
        category: string;
        durationYears: number;
        eligibility: string;
        rating?: number | undefined;
        entranceExams?: string[] | undefined;
        featured?: boolean | undefined;
        fees?: {
            min: number;
            max: number;
            currency?: string | undefined;
        } | undefined;
        shortName?: string | undefined;
        image?: string | undefined;
        admissionProcess?: string | undefined;
        syllabus?: {
            semester: string;
            subjects: string[];
        }[] | undefined;
        careerOpportunities?: string[] | undefined;
        averageSalary?: {
            min: number;
            max: number;
            currency?: string | undefined;
        } | undefined;
        topRecruiters?: string[] | undefined;
        specializations?: string[] | undefined;
        collegeCount?: number | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        name: string;
        description: string;
        duration: string;
        level: "undergraduate" | "postgraduate" | "diploma" | "doctorate" | "certificate";
        category: string;
        durationYears: number;
        eligibility: string;
        rating?: number | undefined;
        entranceExams?: string[] | undefined;
        featured?: boolean | undefined;
        fees?: {
            min: number;
            max: number;
            currency: string;
        } | undefined;
        shortName?: string | undefined;
        image?: string | undefined;
        admissionProcess?: string | undefined;
        syllabus?: {
            semester: string;
            subjects: string[];
        }[] | undefined;
        careerOpportunities?: string[] | undefined;
        averageSalary?: {
            min: number;
            max: number;
            currency: string;
        } | undefined;
        topRecruiters?: string[] | undefined;
        specializations?: string[] | undefined;
        collegeCount?: number | undefined;
    };
}, {
    body: {
        name: string;
        description: string;
        duration: string;
        level: "undergraduate" | "postgraduate" | "diploma" | "doctorate" | "certificate";
        category: string;
        durationYears: number;
        eligibility: string;
        rating?: number | undefined;
        entranceExams?: string[] | undefined;
        featured?: boolean | undefined;
        fees?: {
            min: number;
            max: number;
            currency?: string | undefined;
        } | undefined;
        shortName?: string | undefined;
        image?: string | undefined;
        admissionProcess?: string | undefined;
        syllabus?: {
            semester: string;
            subjects: string[];
        }[] | undefined;
        careerOpportunities?: string[] | undefined;
        averageSalary?: {
            min: number;
            max: number;
            currency?: string | undefined;
        } | undefined;
        topRecruiters?: string[] | undefined;
        specializations?: string[] | undefined;
        collegeCount?: number | undefined;
    };
}>;
export declare const updateCourseSchema: z.ZodObject<{
    body: z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        shortName: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        description: z.ZodOptional<z.ZodString>;
        image: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        category: z.ZodOptional<z.ZodString>;
        level: z.ZodOptional<z.ZodEnum<["undergraduate", "postgraduate", "diploma", "doctorate", "certificate"]>>;
        duration: z.ZodOptional<z.ZodString>;
        durationYears: z.ZodOptional<z.ZodNumber>;
        eligibility: z.ZodOptional<z.ZodString>;
        admissionProcess: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        syllabus: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodObject<{
            semester: z.ZodString;
            subjects: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            semester: string;
            subjects: string[];
        }, {
            semester: string;
            subjects: string[];
        }>, "many">>>;
        careerOpportunities: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
        averageSalary: z.ZodOptional<z.ZodOptional<z.ZodObject<{
            min: z.ZodNumber;
            max: z.ZodNumber;
            currency: z.ZodDefault<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            min: number;
            max: number;
            currency: string;
        }, {
            min: number;
            max: number;
            currency?: string | undefined;
        }>>>;
        topRecruiters: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
        fees: z.ZodOptional<z.ZodOptional<z.ZodObject<{
            min: z.ZodNumber;
            max: z.ZodNumber;
            currency: z.ZodDefault<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            min: number;
            max: number;
            currency: string;
        }, {
            min: number;
            max: number;
            currency?: string | undefined;
        }>>>;
        entranceExams: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
        specializations: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
        collegeCount: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
        rating: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
        featured: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
    }, "strip", z.ZodTypeAny, {
        name?: string | undefined;
        description?: string | undefined;
        rating?: number | undefined;
        entranceExams?: string[] | undefined;
        featured?: boolean | undefined;
        duration?: string | undefined;
        fees?: {
            min: number;
            max: number;
            currency: string;
        } | undefined;
        level?: "undergraduate" | "postgraduate" | "diploma" | "doctorate" | "certificate" | undefined;
        shortName?: string | undefined;
        image?: string | undefined;
        category?: string | undefined;
        durationYears?: number | undefined;
        eligibility?: string | undefined;
        admissionProcess?: string | undefined;
        syllabus?: {
            semester: string;
            subjects: string[];
        }[] | undefined;
        careerOpportunities?: string[] | undefined;
        averageSalary?: {
            min: number;
            max: number;
            currency: string;
        } | undefined;
        topRecruiters?: string[] | undefined;
        specializations?: string[] | undefined;
        collegeCount?: number | undefined;
    }, {
        name?: string | undefined;
        description?: string | undefined;
        rating?: number | undefined;
        entranceExams?: string[] | undefined;
        featured?: boolean | undefined;
        duration?: string | undefined;
        fees?: {
            min: number;
            max: number;
            currency?: string | undefined;
        } | undefined;
        level?: "undergraduate" | "postgraduate" | "diploma" | "doctorate" | "certificate" | undefined;
        shortName?: string | undefined;
        image?: string | undefined;
        category?: string | undefined;
        durationYears?: number | undefined;
        eligibility?: string | undefined;
        admissionProcess?: string | undefined;
        syllabus?: {
            semester: string;
            subjects: string[];
        }[] | undefined;
        careerOpportunities?: string[] | undefined;
        averageSalary?: {
            min: number;
            max: number;
            currency?: string | undefined;
        } | undefined;
        topRecruiters?: string[] | undefined;
        specializations?: string[] | undefined;
        collegeCount?: number | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        name?: string | undefined;
        description?: string | undefined;
        rating?: number | undefined;
        entranceExams?: string[] | undefined;
        featured?: boolean | undefined;
        duration?: string | undefined;
        fees?: {
            min: number;
            max: number;
            currency: string;
        } | undefined;
        level?: "undergraduate" | "postgraduate" | "diploma" | "doctorate" | "certificate" | undefined;
        shortName?: string | undefined;
        image?: string | undefined;
        category?: string | undefined;
        durationYears?: number | undefined;
        eligibility?: string | undefined;
        admissionProcess?: string | undefined;
        syllabus?: {
            semester: string;
            subjects: string[];
        }[] | undefined;
        careerOpportunities?: string[] | undefined;
        averageSalary?: {
            min: number;
            max: number;
            currency: string;
        } | undefined;
        topRecruiters?: string[] | undefined;
        specializations?: string[] | undefined;
        collegeCount?: number | undefined;
    };
}, {
    body: {
        name?: string | undefined;
        description?: string | undefined;
        rating?: number | undefined;
        entranceExams?: string[] | undefined;
        featured?: boolean | undefined;
        duration?: string | undefined;
        fees?: {
            min: number;
            max: number;
            currency?: string | undefined;
        } | undefined;
        level?: "undergraduate" | "postgraduate" | "diploma" | "doctorate" | "certificate" | undefined;
        shortName?: string | undefined;
        image?: string | undefined;
        category?: string | undefined;
        durationYears?: number | undefined;
        eligibility?: string | undefined;
        admissionProcess?: string | undefined;
        syllabus?: {
            semester: string;
            subjects: string[];
        }[] | undefined;
        careerOpportunities?: string[] | undefined;
        averageSalary?: {
            min: number;
            max: number;
            currency?: string | undefined;
        } | undefined;
        topRecruiters?: string[] | undefined;
        specializations?: string[] | undefined;
        collegeCount?: number | undefined;
    };
}>;
export declare const getCoursesQuerySchema: z.ZodObject<{
    query: z.ZodObject<{
        page: z.ZodOptional<z.ZodString>;
        limit: z.ZodOptional<z.ZodString>;
        search: z.ZodOptional<z.ZodString>;
        category: z.ZodOptional<z.ZodString>;
        level: z.ZodOptional<z.ZodEnum<["undergraduate", "postgraduate", "diploma", "doctorate", "certificate"]>>;
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
        level?: "undergraduate" | "postgraduate" | "diploma" | "doctorate" | "certificate" | undefined;
        category?: string | undefined;
    }, {
        search?: string | undefined;
        limit?: string | undefined;
        page?: string | undefined;
        sortBy?: string | undefined;
        sortOrder?: "asc" | "desc" | undefined;
        featured?: string | undefined;
        level?: "undergraduate" | "postgraduate" | "diploma" | "doctorate" | "certificate" | undefined;
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
        level?: "undergraduate" | "postgraduate" | "diploma" | "doctorate" | "certificate" | undefined;
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
        level?: "undergraduate" | "postgraduate" | "diploma" | "doctorate" | "certificate" | undefined;
        category?: string | undefined;
    };
}>;
//# sourceMappingURL=course.validation.d.ts.map