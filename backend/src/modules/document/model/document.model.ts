import mongoose, { Schema, Document } from "mongoose";

export interface IDocument extends Document {
  name: string;
  type: string;
  category: "college" | "user" | "lead" | "payment" | "system";
  fileUrl: string;
  originalName: string;
  mimeType: string;
  size: number;
  uploadedBy: mongoose.Types.ObjectId;
  entityId?: mongoose.Types.ObjectId;
  description?: string;
  status: "pending" | "approved" | "rejected";
  verifiedBy?: mongoose.Types.ObjectId;
  verifiedAt?: Date;
  rejectionReason?: string;
  isActive: boolean;
  expiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const DocumentSchema = new Schema<IDocument>(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    category: {
      type: String,
      enum: ["college", "user", "lead", "payment", "system"],
      required: true,
    },
    fileUrl: { type: String, required: true },
    originalName: { type: String, required: true },
    mimeType: { type: String },
    size: { type: Number },
    uploadedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    entityId: { type: Schema.Types.ObjectId },
    description: { type: String },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    verifiedBy: { type: Schema.Types.ObjectId, ref: "User" },
    verifiedAt: { type: Date },
    rejectionReason: { type: String },
    isActive: { type: Boolean, default: true },
    expiresAt: { type: Date },
  },
  { timestamps: true }
);

DocumentSchema.index({ category: 1, status: 1 });
DocumentSchema.index({ entityId: 1 });
DocumentSchema.index({ uploadedBy: 1 });
DocumentSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model<IDocument>("Document", DocumentSchema);