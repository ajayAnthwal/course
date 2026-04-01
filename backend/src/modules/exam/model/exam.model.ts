import mongoose, { Document, Schema } from "mongoose";

export interface IExam extends Document {
  name: string;
  slug: string;
  fullName: string;
  description: string;
  image?: string;
  category: string;
  level: "national" | "state" | "university";
  conductingBody: string;
  mode: "computer-based" | "pen-paper" | "both";
  frequency: string;
  eligibility: string;
  syllabus: { subject: string; topics: string[] }[];
  examPattern: { section: string; questions: number; marks: number; duration: string }[];
  importantDates: { event: string; date: string }[];
  registrationFee: { amount: number; currency: string };
  website?: string;
  applicants: string;
  totalMarks: number;
  duration: string;
  languages: string[];
  rating: number;
  featured: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const examSchema = new Schema<IExam>(
  {
    name: { type: String, required: true, trim: true, maxlength: 200 },
    slug: { type: String, unique: true, lowercase: true },
    fullName: { type: String, required: true },
    description: { type: String, required: true, maxlength: 10000 },
    image: String,
    category: { type: String, required: true },
    level: { type: String, enum: ["national", "state", "university"], required: true },
    conductingBody: { type: String, required: true },
    mode: { type: String, enum: ["computer-based", "pen-paper", "both"], required: true },
    frequency: String,
    eligibility: { type: String, required: true },
    syllabus: [{ subject: String, topics: [String] }],
    examPattern: [{ section: String, questions: Number, marks: Number, duration: String }],
    importantDates: [{ event: String, date: String }],
    registrationFee: { amount: Number, currency: { type: String, default: "INR" } },
    website: String,
    applicants: String,
    totalMarks: Number,
    duration: String,
    languages: [String],
    rating: { type: Number, min: 0, max: 5, default: 0 },
    featured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

examSchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = this.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }
  next();
});

examSchema.index({ slug: 1 });
examSchema.index({ category: 1, isActive: 1 });
examSchema.index({ featured: 1 });
examSchema.index({ name: "text", description: "text" });

const Exam = mongoose.model<IExam>("Exam", examSchema);
export default Exam;
