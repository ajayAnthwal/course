import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";

export type UserRole = "admin" | "student" | "college" | "teacher";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  phone?: string;
  avatar?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  educationDetails: {
    school?: string;
    schoolBoard?: string;
    schoolYear?: string;
    schoolMarks?: string;
    college?: string;
    collegeBoard?: string;
    collegeYear?: string;
    collegeMarks?: string;
    degree?: string;
    university?: string;
    graduationYear?: string;
    graduationMarks?: string;
  };
  preferredCourse?: string;
  preferredCity?: string;
  dateOfBirth?: string;
  gender?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  notificationPreferences: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
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
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
      select: false,
    },
    role: {
      type: String,
      enum: ["admin", "student", "college", "teacher"],
      default: "student",
    },
    phone: {
      type: String,
      trim: true,
    },
    avatar: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    educationDetails: {
      school: String,
      schoolBoard: String,
      schoolYear: String,
      schoolMarks: String,
      college: String,
      collegeBoard: String,
      collegeYear: String,
      collegeMarks: String,
      degree: String,
      university: String,
      graduationYear: String,
      graduationMarks: String,
    },
    preferredCourse: String,
    preferredCity: String,
    dateOfBirth: String,
    gender: String,
    address: String,
    city: String,
    state: String,
    pincode: String,
    notificationPreferences: {
      email: { type: Boolean, default: true },
      sms: { type: Boolean, default: true },
      push: { type: Boolean, default: true },
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

const User = mongoose.model<IUser>("User", userSchema);

export default User;
