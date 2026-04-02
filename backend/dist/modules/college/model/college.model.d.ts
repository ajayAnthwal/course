import mongoose, { Document } from "mongoose";
export interface ICollege extends Document {
    name: string;
    slug: string;
    description: string;
    logo?: string;
    coverImage?: string;
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
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
declare const College: mongoose.Model<ICollege, {}, {}, {}, mongoose.Document<unknown, {}, ICollege, {}, {}> & ICollege & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
export default College;
//# sourceMappingURL=college.model.d.ts.map