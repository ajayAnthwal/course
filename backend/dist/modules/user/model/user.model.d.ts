import mongoose, { Document } from "mongoose";
export type UserRole = "admin" | "student" | "college" | "teacher";
export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: UserRole;
    phone?: string;
    avatar?: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidatePassword: string): Promise<boolean>;
}
declare const User: mongoose.Model<IUser, {}, {}, {}, mongoose.Document<unknown, {}, IUser, {}, {}> & IUser & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
export default User;
//# sourceMappingURL=user.model.d.ts.map