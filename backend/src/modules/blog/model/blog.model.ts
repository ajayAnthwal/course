import mongoose, { Document, Schema } from "mongoose";

export interface IBlog extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image?: string;
  category: string;
  author: string;
  authorAvatar?: string;
  tags: string[];
  readTime: string;
  featured: boolean;
  isActive: boolean;
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const blogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true, trim: true, maxlength: 500 },
    slug: { type: String, lowercase: true },
    excerpt: { type: String, required: true, maxlength: 500 },
    content: { type: String, required: true, maxlength: 50000 },
    image: String,
    category: { type: String, required: true },
    author: { type: String, required: true },
    authorAvatar: String,
    tags: [String],
    readTime: String,
    featured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    publishedAt: Date,
  },
  { timestamps: true }
);

blogSchema.pre("save", function (next) {
  if (this.isModified("title")) {
    this.slug = this.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }
  if (!this.readTime) {
    const words = this.content.split(/\s+/).length;
    this.readTime = `${Math.max(1, Math.ceil(words / 200))} min read`;
  }
  if (!this.publishedAt) {
    this.publishedAt = new Date();
  }
  next();
});

blogSchema.index({ category: 1, isActive: 1 });
blogSchema.index({ featured: 1 });
blogSchema.index({ publishedAt: -1 });
blogSchema.index({ slug: 1 }, { unique: true });

const Blog = mongoose.model<IBlog>("Blog", blogSchema);
export default Blog;
