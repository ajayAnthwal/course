import mongoose, { Document } from "mongoose";
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
declare const Category: mongoose.Model<ICategory, {}, {}, {}, mongoose.Document<unknown, {}, ICategory, {}, {}> & ICategory & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
export default Category;
//# sourceMappingURL=category.model.d.ts.map