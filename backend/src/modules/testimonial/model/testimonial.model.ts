import mongoose, { Document, Schema } from "mongoose";

export interface ITestimonial extends Document {
  name: string;
  role: string;
  avatar?: string;
  rating: number;
  content: string;
  college?: string;
  isActive: boolean;
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
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

testimonialSchema.index({ isActive: 1 });

const Testimonial = mongoose.model<ITestimonial>("Testimonial", testimonialSchema);
export default Testimonial;
