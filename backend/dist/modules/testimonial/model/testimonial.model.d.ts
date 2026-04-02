import mongoose, { Document } from "mongoose";
export interface ITestimonial extends Document {
    name: string;
    role: string;
    avatar?: string;
    rating: number;
    content: string;
    college?: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
declare const Testimonial: mongoose.Model<ITestimonial, {}, {}, {}, mongoose.Document<unknown, {}, ITestimonial, {}, {}> & ITestimonial & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
export default Testimonial;
//# sourceMappingURL=testimonial.model.d.ts.map