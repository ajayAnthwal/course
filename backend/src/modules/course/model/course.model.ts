import mongoose, { Document, Schema } from "mongoose";

export interface ICourse extends Document {
  name: string;
  slug: string;
  shortName: string;
  description: string;
  image?: string;
  category: string;
  level: "undergraduate" | "postgraduate" | "diploma" | "doctorate" | "certificate";
  duration: string;
  durationYears: number;
  eligibility: string;
  admissionProcess: string;
  syllabus: { semester: string; subjects: string[] }[];
  careerOpportunities: string[];
  averageSalary: { min: number; max: number; currency: string };
  topRecruiters: string[];
  fees: { min: number; max: number; currency: string };
  entranceExams: string[];
  specializations: string[];
  collegeCount: number;
  rating: number;
  featured: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const courseSchema = new Schema<ICourse>(
  {
    name: { type: String, required: true, trim: true, maxlength: 300 },
    slug: { type: String, lowercase: true },
    shortName: { type: String, trim: true },
    description: { type: String, required: true, maxlength: 10000 },
    image: String,
    category: { type: String, required: true },
    level: {
      type: String,
      enum: ["undergraduate", "postgraduate", "diploma", "doctorate", "certificate"],
      required: true,
    },
    duration: { type: String, required: true },
    durationYears: { type: Number, required: true },
    eligibility: { type: String, required: true },
    admissionProcess: String,
    syllabus: [{ semester: String, subjects: [String] }],
    careerOpportunities: [String],
    averageSalary: { min: Number, max: Number, currency: { type: String, default: "INR" } },
    topRecruiters: [String],
    fees: { min: Number, max: Number, currency: { type: String, default: "INR" } },
    entranceExams: [String],
    specializations: [String],
    collegeCount: { type: Number, default: 0 },
    rating: { type: Number, min: 0, max: 5, default: 0 },
    featured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

courseSchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = this.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }
  next();
});

courseSchema.index({ category: 1, isActive: 1 });
courseSchema.index({ featured: 1 });
courseSchema.index({ slug: 1 }, { unique: true });
courseSchema.index({ name: "text", description: "text" });

const Course = mongoose.model<ICourse>("Course", courseSchema);
export default Course;
