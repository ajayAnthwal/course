import mongoose, { Document, Schema } from "mongoose";

export interface ITestimonial extends Document {
  name: string;
  role: string;
  avatar?: string;
  rating: number;
  content: string;
  college?: string;
  user?: mongoose.Types.ObjectId;
  isActive: boolean;
  status: "pending" | "approved" | "rejected";
  isFeatured: boolean;
  approvedBy?: mongoose.Types.ObjectId;
  approvedAt?: Date;
  rejectionReason?: string;
  createdAt: Date;
  updatedAt: Date;
}

const testimonialSchema = new Schema<ITestimonial>(
  {
    name: { type: String, required: true, trim: true },
    role: { type: String, required: true },
    avatar: String,
    rating: { type: Number, min: 1, max: 5, default: 5 },
    content: { type: String, required: true, maxlength: 1000 },
    college: String,
    user: { type: Schema.Types.ObjectId, ref: "User" },
    isActive: { type: Boolean, default: true },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    isFeatured: { type: Boolean, default: false },
    approvedBy: { type: Schema.Types.ObjectId, ref: "User" },
    approvedAt: { type: Date },
    rejectionReason: { type: String, maxlength: 500 },
  },
  { timestamps: true }
);

testimonialSchema.index({ isActive: 1 });
testimonialSchema.index({ status: 1 });
testimonialSchema.index({ isFeatured: 1 });

const Testimonial = mongoose.model<ITestimonial>("Testimonial", testimonialSchema);
export default Testimonial;
