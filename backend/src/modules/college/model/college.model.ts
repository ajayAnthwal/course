import mongoose, { Document, Schema } from "mongoose";

export interface ICollege extends Document {
  name: string;
  slug: string;
  description: string;
  logo?: string;
  coverImage?: string;
  prospectus?: string;
  location: {
    city: string;
    state: string;
    country: string;
    address?: string;
    pincode?: string;
  };
  type: "government" | "private" | "deemed" | "autonomous";
  establishedYear: number;
  approvedBy: string[];
  courses: {
    name: string;
    duration: string;
    fees: {
      min: number;
      max: number;
      currency: string;
    };
    level: "undergraduate" | "postgraduate" | "diploma" | "doctorate";
  }[];
  facilities: string[];
  rankings: {
    source: string;
    rank: number;
    year: number;
  }[];
  rating: number;
  reviewCount: number;
  nirf: {
    overall: number;
    engineering: number;
    management: number;
    pharmacy: number;
    medical: number;
  };
  entranceExams: string[];
  website?: string;
  email?: string;
  phone?: string;
  featured: boolean;
  verified: boolean;
  verificationStatus: "pending" | "verified" | "rejected";
  verifiedBy?: mongoose.Types.ObjectId;
  verifiedAt?: Date;
  rejectionReason?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const collegeSchema = new Schema<ICollege>(
  {
    name: {
      type: String,
      required: [true, "College name is required"],
      trim: true,
      maxlength: [200, "College name cannot exceed 200 characters"],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      maxlength: [5000, "Description cannot exceed 5000 characters"],
    },
    logo: String,
    coverImage: String,
    location: {
      city: { type: String, required: true },
      state: { type: String, required: true },
      country: { type: String, default: "India" },
      address: String,
      pincode: String,
    },
    type: {
      type: String,
      enum: ["government", "private", "deemed", "autonomous"],
      required: true,
    },
    establishedYear: {
      type: Number,
      required: true,
    },
    approvedBy: [String],
    courses: [
      {
        name: { type: String, required: true },
        duration: String,
        fees: {
          min: Number,
          max: Number,
          currency: { type: String, default: "INR" },
        },
        level: {
          type: String,
          enum: ["undergraduate", "postgraduate", "diploma", "doctorate"],
        },
      },
    ],
    facilities: [String],
    rankings: [
      {
        source: String,
        rank: Number,
        year: Number,
      },
    ],
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
    nirf: {
      overall: { type: Number, default: 0 },
      engineering: { type: Number, default: 0 },
      management: { type: Number, default: 0 },
      pharmacy: { type: Number, default: 0 },
      medical: { type: Number, default: 0 },
    },
    entranceExams: [String],
    website: String,
    email: String,
    phone: String,
    featured: {
      type: Boolean,
      default: false,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    verificationStatus: {
      type: String,
      enum: ["pending", "verified", "rejected"],
      default: "pending",
    },
    verifiedBy: { type: Schema.Types.ObjectId, ref: "User" },
    verifiedAt: { type: Date },
    rejectionReason: { type: String, maxlength: 500 },
    prospectus: String,
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

collegeSchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }
  next();
});

collegeSchema.index({ "location.city": 1, "location.state": 1 });
collegeSchema.index({ type: 1 });
collegeSchema.index({ featured: 1 });
collegeSchema.index({ rating: -1 });
collegeSchema.index({ name: "text", description: "text" });

const College = mongoose.model<ICollege>("College", collegeSchema);

export default College;
