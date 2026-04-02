import mongoose, { Document } from "mongoose";
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
    syllabus: {
        semester: string;
        subjects: string[];
    }[];
    careerOpportunities: string[];
    averageSalary: {
        min: number;
        max: number;
        currency: string;
    };
    topRecruiters: string[];
    fees: {
        min: number;
        max: number;
        currency: string;
    };
    entranceExams: string[];
    specializations: string[];
    collegeCount: number;
    rating: number;
    featured: boolean;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
declare const Course: mongoose.Model<ICourse, {}, {}, {}, mongoose.Document<unknown, {}, ICourse, {}, {}> & ICourse & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
export default Course;
//# sourceMappingURL=course.model.d.ts.map