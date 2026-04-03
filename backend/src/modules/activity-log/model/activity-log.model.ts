import mongoose, { Schema, Document } from "mongoose";

export interface IActivityLog extends Document {
  user?: mongoose.Types.ObjectId;
  action: string;
  resource: string;
  resourceId?: string;
  details?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
  status: "success" | "failure";
  errorMessage?: string;
  createdAt: Date;
}

const ActivityLogSchema = new Schema<IActivityLog>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    action: {
      type: String,
      required: true,
      enum: [
        "login",
        "logout",
        "login_failed",
        "create",
        "update",
        "delete",
        "view",
        "export",
        "import",
        "approve",
        "reject",
        "block",
        "unblock",
        "verify",
        "payment",
        "refund",
        "export_csv",
        "export_json",
        "bulk_import",
      ],
    },
    resource: {
      type: String,
      required: true,
      enum: [
        "auth",
        "user",
        "college",
        "lead",
        "payment",
        "notification",
        "testimonial",
        "blog",
        "news",
        "category",
        "course",
        "exam",
        "document",
        "role",
        "settings",
        "api",
      ],
    },
    resourceId: { type: String },
    details: { type: Schema.Types.Mixed },
    ipAddress: { type: String },
    userAgent: { type: String },
    status: {
      type: String,
      enum: ["success", "failure"],
      default: "success",
    },
    errorMessage: { type: String },
  },
  { timestamps: true }
);

ActivityLogSchema.index({ createdAt: -1 });
ActivityLogSchema.index({ user: 1, createdAt: -1 });
ActivityLogSchema.index({ action: 1, createdAt: -1 });
ActivityLogSchema.index({ resource: 1, createdAt: -1 });
ActivityLogSchema.index({ resourceId: 1 });

export default mongoose.model<IActivityLog>("ActivityLog", ActivityLogSchema);