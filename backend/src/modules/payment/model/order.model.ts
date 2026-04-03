import mongoose, { Document, Schema } from "mongoose";

export type PaymentStatus = "created" | "authorized" | "captured" | "refunded" | "failed";
export type PlanType = "basic" | "premium" | "enterprise" | "application_fee";

export interface IOrder extends Document {
  user: mongoose.Types.ObjectId;
  college?: mongoose.Types.ObjectId;
  application?: mongoose.Types.ObjectId;
  plan: PlanType;
  amount: number;
  currency: string;
  razorpayOrderId: string;
  razorpayPaymentId?: string;
  razorpaySignature?: string;
  status: PaymentStatus;
  receipt?: string;
  notes?: string;
  refundAmount?: number;
  refundDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema = new Schema<IOrder>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    college: {
      type: Schema.Types.ObjectId,
      ref: "College",
    },
    application: {
      type: Schema.Types.ObjectId,
      ref: "Application",
    },
    plan: {
      type: String,
      enum: ["basic", "premium", "enterprise", "application_fee"],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    currency: {
      type: String,
      default: "INR",
    },
    razorpayOrderId: {
      type: String,
      required: true,
      unique: true,
    },
    razorpayPaymentId: String,
    razorpaySignature: String,
    status: {
      type: String,
      enum: ["created", "authorized", "captured", "refunded", "failed"],
      default: "created",
    },
    receipt: String,
    notes: String,
    refundAmount: Number,
    refundDate: Date,
  },
  {
    timestamps: true,
  }
);

orderSchema.index({ user: 1, status: 1 });

const Order = mongoose.model<IOrder>("Order", orderSchema);

export default Order;
