import mongoose, { Document } from "mongoose";
export interface IExam extends Document {
    name: string;
    slug: string;
    fullName: string;
    description: string;
    image?: string;
    category: string;
    level: "national" | "state" | "university";
    conductingBody: string;
    mode: "computer-based" | "pen-paper" | "both";
    frequency: string;
    eligibility: string;
    syllabus: {
        subject: string;
        topics: string[];
    }[];
    examPattern: {
        section: string;
        questions: number;
        marks: number;
        duration: string;
    }[];
    importantDates: {
        event: string;
        date: string;
    }[];
    registrationFee: {
        amount: number;
        currency: string;
    };
    website?: string;
    applicants: string;
    totalMarks: number;
    duration: string;
    languages: string[];
    rating: number;
    featured: boolean;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
declare const Exam: mongoose.Model<IExam, {}, {}, {}, mongoose.Document<unknown, {}, IExam, {}, {}> & IExam & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
export default Exam;
//# sourceMappingURL=exam.model.d.ts.map