import mongoose, { Document, Schema } from "mongoose";

export interface IReview extends Document {
  user: mongoose.Types.ObjectId;
  college: mongoose.Types.ObjectId;
  rating: number;
  content: string;
  pros?: string;
  cons?: string;
  status: "pending" | "approved" | "rejected";
  rejectionReason?: string;
  approvedBy?: mongoose.Types.ObjectId;
  approvedAt?: Date;
  helpfulCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const reviewSchema = new Schema<IReview>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    college: { type: Schema.Types.ObjectId, ref: "College", required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    content: { type: String, required: true, maxlength: 2000 },
    pros: { type: String, maxlength: 500 },
    cons: { type: String, maxlength: 500 },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    rejectionReason: { type: String, maxlength: 500 },
    approvedBy: { type: Schema.Types.ObjectId, ref: "User" },
    approvedAt: { type: Date },
    helpfulCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

reviewSchema.index({ user: 1, college: 1 }, { unique: true });
reviewSchema.index({ college: 1, status: 1 });
reviewSchema.index({ status: 1 });

export interface IQuestion extends Document {
  user: mongoose.Types.ObjectId;
  college: mongoose.Types.ObjectId;
  question: string;
  answer?: string;
  answeredBy?: mongoose.Types.ObjectId;
  answeredAt?: Date;
  status: "pending" | "answered";
  createdAt: Date;
  updatedAt: Date;
}

const questionSchema = new Schema<IQuestion>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    college: { type: Schema.Types.ObjectId, ref: "College", required: true },
    question: { type: String, required: true, maxlength: 1000 },
    answer: { type: String, maxlength: 2000 },
    answeredBy: { type: Schema.Types.ObjectId, ref: "User" },
    answeredAt: { type: Date },
    status: {
      type: String,
      enum: ["pending", "answered"],
      default: "pending",
    },
  },
  { timestamps: true }
);

questionSchema.index({ user: 1, college: 1 });
questionSchema.index({ college: 1, status: 1 });

export const Review = mongoose.model<IReview>("Review", reviewSchema);
export const Question = mongoose.model<IQuestion>("Question", questionSchema);
