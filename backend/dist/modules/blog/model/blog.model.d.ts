import mongoose, { Document } from "mongoose";
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
declare const Blog: mongoose.Model<IBlog, {}, {}, {}, mongoose.Document<unknown, {}, IBlog, {}, {}> & IBlog & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
export default Blog;
//# sourceMappingURL=blog.model.d.ts.map