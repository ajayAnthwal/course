import mongoose, { Schema, Document } from "mongoose";

export interface IApplication extends Document {
  user: mongoose.Types.ObjectId;
  college: mongoose.Types.ObjectId;
  course: string;
  status: "applied" | "under_review" | "shortlisted" | "rejected" | "accepted" | "paid" | "enrolled";
  paymentStatus: "pending" | "paid" | "failed" | "refunded";
  paymentAmount?: number;
  paymentId?: string;
  formData: Record<string, any>;
  documents: mongoose.Types.ObjectId[];
  notes?: string;
  rejectedReason?: string;
  timeline: {
    status: string;
    note?: string;
    date: Date;
  }[];
  appliedAt: Date;
  updatedAt: Date;
}

const ApplicationSchema = new Schema<IApplication>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    college: { type: Schema.Types.ObjectId, ref: "College", required: true },
    course: { type: String, required: true },
    status: {
      type: String,
      enum: ["applied", "under_review", "shortlisted", "rejected", "accepted", "paid", "enrolled"],
      default: "applied",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },
    paymentAmount: { type: Number },
    paymentId: { type: String },
    formData: { type: Schema.Types.Mixed },
    documents: [{ type: Schema.Types.ObjectId, ref: "Document" }],
    notes: { type: String },
    rejectedReason: { type: String },
    timeline: [
      {
        status: String,
        note: String,
        date: { type: Date, default: Date.now },
      },
    ],
    appliedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

ApplicationSchema.index({ user: 1, status: 1 });
ApplicationSchema.index({ user: 1, college: 1 }, { unique: true });
ApplicationSchema.index({ college: 1, status: 1 });

export default mongoose.model<IApplication>("Application", ApplicationSchema);