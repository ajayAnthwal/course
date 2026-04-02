import mongoose, { Document } from "mongoose";
export interface INews extends Document {
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
declare const News: mongoose.Model<INews, {}, {}, {}, mongoose.Document<unknown, {}, INews, {}, {}> & INews & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
export default News;
//# sourceMappingURL=news.model.d.ts.map