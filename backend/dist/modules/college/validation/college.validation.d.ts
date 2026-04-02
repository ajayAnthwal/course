import { z } from "zod";
export declare const createCollegeSchema: z.ZodObject<{
    body: z.ZodObject<{
        name: z.ZodString;
        description: z.ZodString;
        logo: z.ZodOptional<z.ZodString>;
        coverImage: z.ZodOptional<z.ZodString>;
        location: z.ZodObject<{
            city: z.ZodString;
            state: z.ZodString;
            country: z.ZodDefault<z.ZodString>;
            address: z.ZodOptional<z.ZodString>;
            pincode: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            city: string;
            state: string;
            country: string;
            address?: string | undefined;
            pincode?: string | undefined;
        }, {
            city: string;
            state: string;
            country?: string | undefined;
            address?: string | undefined;
            pincode?: string | undefined;
        }>;
        type: z.ZodEnum<["government", "private", "deemed", "autonomous"]>;
        establishedYear: z.ZodNumber;
        approvedBy: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        courses: z.ZodOptional<z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            duration: z.ZodOptional<z.ZodString>;
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
            level: z.ZodOptional<z.ZodEnum<["undergraduate", "postgraduate", "diploma", "doctorate"]>>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            duration?: string | undefined;
            fees?: {
                min: number;
                max: number;
                currency: string;
            } | undefined;
            level?: "undergraduate" | "postgraduate" | "diploma" | "doctorate" | undefined;
        }, {
            name: string;
            duration?: string | undefined;
            fees?: {
                min: number;
                max: number;
                currency?: string | undefined;
            } | undefined;
            level?: "undergraduate" | "postgraduate" | "diploma" | "doctorate" | undefined;
        }>, "many">>;
        facilities: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        entranceExams: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        website: z.ZodOptional<z.ZodString>;
        email: z.ZodOptional<z.ZodString>;
        phone: z.ZodOptional<z.ZodString>;
        featured: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        type: "government" | "private" | "deemed" | "autonomous";
        description: string;
        location: {
            city: string;
            state: string;
            country: string;
            address?: string | undefined;
            pincode?: string | undefined;
        };
        establishedYear: number;
        email?: string | undefined;
        phone?: string | undefined;
        logo?: string | undefined;
        coverImage?: string | undefined;
        approvedBy?: string[] | undefined;
        courses?: {
            name: string;
            duration?: string | undefined;
            fees?: {
                min: number;
                max: number;
                currency: string;
            } | undefined;
            level?: "undergraduate" | "postgraduate" | "diploma" | "doctorate" | undefined;
        }[] | undefined;
        facilities?: string[] | undefined;
        entranceExams?: string[] | undefined;
        website?: string | undefined;
        featured?: boolean | undefined;
    }, {
        name: string;
        type: "government" | "private" | "deemed" | "autonomous";
        description: string;
        location: {
            city: string;
            state: string;
            country?: string | undefined;
            address?: string | undefined;
            pincode?: string | undefined;
        };
        establishedYear: number;
        email?: string | undefined;
        phone?: string | undefined;
        logo?: string | undefined;
        coverImage?: string | undefined;
        approvedBy?: string[] | undefined;
        courses?: {
            name: string;
            duration?: string | undefined;
            fees?: {
                min: number;
                max: number;
                currency?: string | undefined;
            } | undefined;
            level?: "undergraduate" | "postgraduate" | "diploma" | "doctorate" | undefined;
        }[] | undefined;
        facilities?: string[] | undefined;
        entranceExams?: string[] | undefined;
        website?: string | undefined;
        featured?: boolean | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        name: string;
        type: "government" | "private" | "deemed" | "autonomous";
        description: string;
        location: {
            city: string;
            state: string;
            country: string;
            address?: string | undefined;
            pincode?: string | undefined;
        };
        establishedYear: number;
        email?: string | undefined;
        phone?: string | undefined;
        logo?: string | undefined;
        coverImage?: string | undefined;
        approvedBy?: string[] | undefined;
        courses?: {
            name: string;
            duration?: string | undefined;
            fees?: {
                min: number;
                max: number;
                currency: string;
            } | undefined;
            level?: "undergraduate" | "postgraduate" | "diploma" | "doctorate" | undefined;
        }[] | undefined;
        facilities?: string[] | undefined;
        entranceExams?: string[] | undefined;
        website?: string | undefined;
        featured?: boolean | undefined;
    };
}, {
    body: {
        name: string;
        type: "government" | "private" | "deemed" | "autonomous";
        description: string;
        location: {
            city: string;
            state: string;
            country?: string | undefined;
            address?: string | undefined;
            pincode?: string | undefined;
        };
        establishedYear: number;
        email?: string | undefined;
        phone?: string | undefined;
        logo?: string | undefined;
        coverImage?: string | undefined;
        approvedBy?: string[] | undefined;
        courses?: {
            name: string;
            duration?: string | undefined;
            fees?: {
                min: number;
                max: number;
                currency?: string | undefined;
            } | undefined;
            level?: "undergraduate" | "postgraduate" | "diploma" | "doctorate" | undefined;
        }[] | undefined;
        facilities?: string[] | undefined;
        entranceExams?: string[] | undefined;
        website?: string | undefined;
        featured?: boolean | undefined;
    };
}>;
export declare const updateCollegeSchema: z.ZodObject<{
    body: z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodString>;
        logo: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        coverImage: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        location: z.ZodOptional<z.ZodObject<{
            city: z.ZodString;
            state: z.ZodString;
            country: z.ZodDefault<z.ZodString>;
            address: z.ZodOptional<z.ZodString>;
            pincode: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            city: string;
            state: string;
            country: string;
            address?: string | undefined;
            pincode?: string | undefined;
        }, {
            city: string;
            state: string;
            country?: string | undefined;
            address?: string | undefined;
            pincode?: string | undefined;
        }>>;
        type: z.ZodOptional<z.ZodEnum<["government", "private", "deemed", "autonomous"]>>;
        establishedYear: z.ZodOptional<z.ZodNumber>;
        approvedBy: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
        courses: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            duration: z.ZodOptional<z.ZodString>;
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
            level: z.ZodOptional<z.ZodEnum<["undergraduate", "postgraduate", "diploma", "doctorate"]>>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            duration?: string | undefined;
            fees?: {
                min: number;
                max: number;
                currency: string;
            } | undefined;
            level?: "undergraduate" | "postgraduate" | "diploma" | "doctorate" | undefined;
        }, {
            name: string;
            duration?: string | undefined;
            fees?: {
                min: number;
                max: number;
                currency?: string | undefined;
            } | undefined;
            level?: "undergraduate" | "postgraduate" | "diploma" | "doctorate" | undefined;
        }>, "many">>>;
        facilities: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
        entranceExams: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
        website: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        email: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        phone: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        featured: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
    }, "strip", z.ZodTypeAny, {
        name?: string | undefined;
        email?: string | undefined;
        phone?: string | undefined;
        type?: "government" | "private" | "deemed" | "autonomous" | undefined;
        description?: string | undefined;
        logo?: string | undefined;
        coverImage?: string | undefined;
        location?: {
            city: string;
            state: string;
            country: string;
            address?: string | undefined;
            pincode?: string | undefined;
        } | undefined;
        establishedYear?: number | undefined;
        approvedBy?: string[] | undefined;
        courses?: {
            name: string;
            duration?: string | undefined;
            fees?: {
                min: number;
                max: number;
                currency: string;
            } | undefined;
            level?: "undergraduate" | "postgraduate" | "diploma" | "doctorate" | undefined;
        }[] | undefined;
        facilities?: string[] | undefined;
        entranceExams?: string[] | undefined;
        website?: string | undefined;
        featured?: boolean | undefined;
    }, {
        name?: string | undefined;
        email?: string | undefined;
        phone?: string | undefined;
        type?: "government" | "private" | "deemed" | "autonomous" | undefined;
        description?: string | undefined;
        logo?: string | undefined;
        coverImage?: string | undefined;
        location?: {
            city: string;
            state: string;
            country?: string | undefined;
            address?: string | undefined;
            pincode?: string | undefined;
        } | undefined;
        establishedYear?: number | undefined;
        approvedBy?: string[] | undefined;
        courses?: {
            name: string;
            duration?: string | undefined;
            fees?: {
                min: number;
                max: number;
                currency?: string | undefined;
            } | undefined;
            level?: "undergraduate" | "postgraduate" | "diploma" | "doctorate" | undefined;
        }[] | undefined;
        facilities?: string[] | undefined;
        entranceExams?: string[] | undefined;
        website?: string | undefined;
        featured?: boolean | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        name?: string | undefined;
        email?: string | undefined;
        phone?: string | undefined;
        type?: "government" | "private" | "deemed" | "autonomous" | undefined;
        description?: string | undefined;
        logo?: string | undefined;
        coverImage?: string | undefined;
        location?: {
            city: string;
            state: string;
            country: string;
            address?: string | undefined;
            pincode?: string | undefined;
        } | undefined;
        establishedYear?: number | undefined;
        approvedBy?: string[] | undefined;
        courses?: {
            name: string;
            duration?: string | undefined;
            fees?: {
                min: number;
                max: number;
                currency: string;
            } | undefined;
            level?: "undergraduate" | "postgraduate" | "diploma" | "doctorate" | undefined;
        }[] | undefined;
        facilities?: string[] | undefined;
        entranceExams?: string[] | undefined;
        website?: string | undefined;
        featured?: boolean | undefined;
    };
}, {
    body: {
        name?: string | undefined;
        email?: string | undefined;
        phone?: string | undefined;
        type?: "government" | "private" | "deemed" | "autonomous" | undefined;
        description?: string | undefined;
        logo?: string | undefined;
        coverImage?: string | undefined;
        location?: {
            city: string;
            state: string;
            country?: string | undefined;
            address?: string | undefined;
            pincode?: string | undefined;
        } | undefined;
        establishedYear?: number | undefined;
        approvedBy?: string[] | undefined;
        courses?: {
            name: string;
            duration?: string | undefined;
            fees?: {
                min: number;
                max: number;
                currency?: string | undefined;
            } | undefined;
            level?: "undergraduate" | "postgraduate" | "diploma" | "doctorate" | undefined;
        }[] | undefined;
        facilities?: string[] | undefined;
        entranceExams?: string[] | undefined;
        website?: string | undefined;
        featured?: boolean | undefined;
    };
}>;
export declare const getCollegesQuerySchema: z.ZodObject<{
    query: z.ZodObject<{
        page: z.ZodOptional<z.ZodString>;
        limit: z.ZodOptional<z.ZodString>;
        search: z.ZodOptional<z.ZodString>;
        city: z.ZodOptional<z.ZodString>;
        state: z.ZodOptional<z.ZodString>;
        type: z.ZodOptional<z.ZodEnum<["government", "private", "deemed", "autonomous"]>>;
        course: z.ZodOptional<z.ZodString>;
        minFees: z.ZodOptional<z.ZodString>;
        maxFees: z.ZodOptional<z.ZodString>;
        minRating: z.ZodOptional<z.ZodString>;
        featured: z.ZodOptional<z.ZodString>;
        sortBy: z.ZodOptional<z.ZodString>;
        sortOrder: z.ZodOptional<z.ZodEnum<["asc", "desc"]>>;
    }, "strip", z.ZodTypeAny, {
        search?: string | undefined;
        limit?: string | undefined;
        type?: "government" | "private" | "deemed" | "autonomous" | undefined;
        page?: string | undefined;
        sortBy?: string | undefined;
        sortOrder?: "asc" | "desc" | undefined;
        featured?: string | undefined;
        city?: string | undefined;
        state?: string | undefined;
        course?: string | undefined;
        minFees?: string | undefined;
        maxFees?: string | undefined;
        minRating?: string | undefined;
    }, {
        search?: string | undefined;
        limit?: string | undefined;
        type?: "government" | "private" | "deemed" | "autonomous" | undefined;
        page?: string | undefined;
        sortBy?: string | undefined;
        sortOrder?: "asc" | "desc" | undefined;
        featured?: string | undefined;
        city?: string | undefined;
        state?: string | undefined;
        course?: string | undefined;
        minFees?: string | undefined;
        maxFees?: string | undefined;
        minRating?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    query: {
        search?: string | undefined;
        limit?: string | undefined;
        type?: "government" | "private" | "deemed" | "autonomous" | undefined;
        page?: string | undefined;
        sortBy?: string | undefined;
        sortOrder?: "asc" | "desc" | undefined;
        featured?: string | undefined;
        city?: string | undefined;
        state?: string | undefined;
        course?: string | undefined;
        minFees?: string | undefined;
        maxFees?: string | undefined;
        minRating?: string | undefined;
    };
}, {
    query: {
        search?: string | undefined;
        limit?: string | undefined;
        type?: "government" | "private" | "deemed" | "autonomous" | undefined;
        page?: string | undefined;
        sortBy?: string | undefined;
        sortOrder?: "asc" | "desc" | undefined;
        featured?: string | undefined;
        city?: string | undefined;
        state?: string | undefined;
        course?: string | undefined;
        minFees?: string | undefined;
        maxFees?: string | undefined;
        minRating?: string | undefined;
    };
}>;
//# sourceMappingURL=college.validation.d.ts.map