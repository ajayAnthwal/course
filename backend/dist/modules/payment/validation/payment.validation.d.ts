import { z } from "zod";
export declare const createOrderSchema: z.ZodObject<{
    body: z.ZodObject<{
        plan: z.ZodEnum<["basic", "premium", "enterprise"]>;
        collegeId: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        plan: "basic" | "premium" | "enterprise";
        collegeId?: string | undefined;
    }, {
        plan: "basic" | "premium" | "enterprise";
        collegeId?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        plan: "basic" | "premium" | "enterprise";
        collegeId?: string | undefined;
    };
}, {
    body: {
        plan: "basic" | "premium" | "enterprise";
        collegeId?: string | undefined;
    };
}>;
export declare const verifyPaymentSchema: z.ZodObject<{
    body: z.ZodObject<{
        razorpayOrderId: z.ZodString;
        razorpayPaymentId: z.ZodString;
        razorpaySignature: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        razorpayOrderId: string;
        razorpayPaymentId: string;
        razorpaySignature: string;
    }, {
        razorpayOrderId: string;
        razorpayPaymentId: string;
        razorpaySignature: string;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        razorpayOrderId: string;
        razorpayPaymentId: string;
        razorpaySignature: string;
    };
}, {
    body: {
        razorpayOrderId: string;
        razorpayPaymentId: string;
        razorpaySignature: string;
    };
}>;
//# sourceMappingURL=payment.validation.d.ts.map