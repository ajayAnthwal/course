import mongoose, { Document, Schema } from "mongoose";

export interface ICategory extends Document {
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  image?: string;
  color?: string;
  count: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const categorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    slug: { type: String, lowercase: true },
    description: { type: String, maxlength: 500 },
    icon: String,
    image: String,
    color: { type: String, default: "#6366f1" },
    count: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

categorySchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = this.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }
  next();
});

categorySchema.index({ isActive: 1 });
categorySchema.index({ slug: 1 }, { unique: true });

const Category = mongoose.model<ICategory>("Category", categorySchema);
export default Category;
