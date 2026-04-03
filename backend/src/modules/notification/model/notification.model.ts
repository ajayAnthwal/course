import mongoose, { Schema, Document } from "mongoose";

export interface INotification extends Document {
  user: mongoose.Types.ObjectId;
  type: "sms" | "email" | "whatsapp" | "in-app";
  title: string;
  message: string;
  status: "pending" | "sent" | "failed";
  recipient: string;
  templateId?: string;
  metadata?: Record<string, any>;
  sentAt?: Date;
  error?: string;
  createdAt: Date;
  updatedAt: Date;
}

const NotificationSchema = new Schema<INotification>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: false },
    type: { type: String, enum: ["sms", "email", "whatsapp", "in-app"], required: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    status: { type: String, enum: ["pending", "sent", "failed"], default: "pending" },
    recipient: { type: String, required: true },
    templateId: { type: String },
    metadata: { type: Schema.Types.Mixed },
    sentAt: { type: Date },
    error: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<INotification>("Notification", NotificationSchema);