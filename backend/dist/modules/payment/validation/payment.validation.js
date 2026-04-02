"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPaymentSchema = exports.createOrderSchema = void 0;
const zod_1 = require("zod");
exports.createOrderSchema = zod_1.z.object({
    body: zod_1.z.object({
        plan: zod_1.z.enum(["basic", "premium", "enterprise"]),
        collegeId: zod_1.z.string().optional(),
    }),
});
exports.verifyPaymentSchema = zod_1.z.object({
    body: zod_1.z.object({
        razorpayOrderId: zod_1.z.string().min(1),
        razorpayPaymentId: zod_1.z.string().min(1),
        razorpaySignature: zod_1.z.string().min(1),
    }),
});
//# sourceMappingURL=payment.validation.js.map