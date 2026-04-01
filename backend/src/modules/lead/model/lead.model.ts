import mongoose, { Document, Schema } from "mongoose";

export type LeadStatus = "new" | "contacted" | "interested" | "admitted" | "not_interested";

export interface ILead extends Document {
  name: string;
  email: string;
  phone: string;
  college: mongoose.Types.ObjectId;
  course?: string;
  message?: string;
  source: string;
  status: LeadStatus;
  assignedTo?: mongoose.Types.ObjectId;
  createdBy?: mongoose.Types.ObjectId;
  followUpDate?: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const leadSchema = new Schema<ILead>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
      trim: true,
    },
    college: {
      type: Schema.Types.ObjectId,
      ref: "College",
      required: [true, "College is required"],
    },
    course: String,
    message: String,
    source: {
      type: String,
      default: "website",
    },
    status: {
      type: String,
      enum: ["new", "contacted", "interested", "admitted", "not_interested"],
      default: "new",
    },
    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    followUpDate: Date,
    notes: String,
  },
  {
    timestamps: true,
  }
);

leadSchema.index({ college: 1, status: 1 });
leadSchema.index({ email: 1 });
leadSchema.index({ createdBy: 1 });
leadSchema.index({ assignedTo: 1 });

const Lead = mongoose.model<ILead>("Lead", leadSchema);

export default Lead;
