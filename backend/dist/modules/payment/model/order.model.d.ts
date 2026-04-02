import mongoose, { Document } from "mongoose";
export type PaymentStatus = "created" | "authorized" | "captured" | "refunded" | "failed";
export type PlanType = "basic" | "premium" | "enterprise";
export interface IOrder extends Document {
    user: mongoose.Types.ObjectId;
    college?: mongoose.Types.ObjectId;
    plan: PlanType;
    amount: number;
    currency: string;
    razorpayOrderId: string;
    razorpayPaymentId?: string;
    razorpaySignature?: string;
    status: PaymentStatus;
    receipt?: string;
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
}
declare const Order: mongoose.Model<IOrder, {}, {}, {}, mongoose.Document<unknown, {}, IOrder, {}, {}> & IOrder & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
export default Order;
//# sourceMappingURL=order.model.d.ts.map