import mongoose, { Schema, Document } from "mongoose";

export interface IFollowup extends Document {
  lead: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  type: "call" | "meeting" | "email" | "reminder" | "note";
  subject: string;
  description?: string;
  status: "pending" | "completed" | "cancelled" | "missed";
  dueDate: Date;
  completedAt?: Date;
  outcome?: string;
  priority: "low" | "medium" | "high";
  createdAt: Date;
  updatedAt: Date;
}

const FollowupSchema = new Schema<IFollowup>(
  {
    lead: { type: Schema.Types.ObjectId, ref: "Lead", required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    type: {
      type: String,
      enum: ["call", "meeting", "email", "reminder", "note"],
      default: "call",
    },
    subject: { type: String, required: true },
    description: { type: String },
    status: {
      type: String,
      enum: ["pending", "completed", "cancelled", "missed"],
      default: "pending",
    },
    dueDate: { type: Date, required: true },
    completedAt: { type: Date },
    outcome: { type: String },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
  },
  { timestamps: true }
);

FollowupSchema.index({ dueDate: 1 });
FollowupSchema.index({ status: 1 });
FollowupSchema.index({ lead: 1 });

export default mongoose.model<IFollowup>("Followup", FollowupSchema);