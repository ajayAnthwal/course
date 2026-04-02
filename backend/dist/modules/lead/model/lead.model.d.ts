import mongoose, { Document } from "mongoose";
export type LeadStatus = "new" | "contacted" | "interested" | "admitted" | "not_interested";
export interface ILead extends Document {
    name: string;
    email: string;
    phone: string;
    college: mongoose.Types.ObjectId;
    course?: string;
    message?: string;
    source: string;
    status: LeadStatus;
    assignedTo?: mongoose.Types.ObjectId;
    createdBy?: mongoose.Types.ObjectId;
    followUpDate?: Date;
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
}
declare const Lead: mongoose.Model<ILead, {}, {}, {}, mongoose.Document<unknown, {}, ILead, {}, {}> & ILead & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
export default Lead;
//# sourceMappingURL=lead.model.d.ts.map