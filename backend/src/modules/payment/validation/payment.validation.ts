import { z } from "zod";

export const createOrderSchema = z.object({
  body: z.object({
    plan: z.enum(["basic", "premium", "enterprise"]),
    collegeId: z.string().optional(),
  }),
});

export const applicationFeeOrderSchema = z.object({
  body: z.object({
    applicationId: z.string().min(1, "Application ID is required"),
    amount: z.number().min(1, "Amount must be at least 1"),
  }),
});

export const verifyPaymentSchema = z.object({
  body: z.object({
    razorpayOrderId: z.string().min(1),
    razorpayPaymentId: z.string().min(1),
    razorpaySignature: z.string().min(1),
  }),
});

export const updateOrderSchema = z.object({
  body: z.object({
    status: z.enum(["created", "authorized", "captured", "refunded", "failed"]),
  }),
});
