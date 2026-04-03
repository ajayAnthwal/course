import mongoose, { Document, Schema } from "mongoose";

export interface ISettings extends Document {
  key: string;
  value: any;
  category: string;
  description?: string;
  isPublic: boolean;
  updatedAt: Date;
}

const SettingsSchema = new Schema<ISettings>(
  {
    key: { type: String, required: true, unique: true },
    value: { type: Schema.Types.Mixed, required: true },
    category: {
      type: String,
      enum: ["general", "api", "payment", "notification", "security", "features", "seo"],
      default: "general",
    },
    description: { type: String },
    isPublic: { type: Boolean, default: false },
  },
  { timestamps: true }
);

SettingsSchema.index({ category: 1 });
SettingsSchema.index({ key: 1 });

export default mongoose.model<ISettings>("Settings", SettingsSchema);