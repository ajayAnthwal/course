import { IUser } from "../model/user.model";
interface GetAllUsersQuery {
    page?: string;
    limit?: string;
    role?: string;
    search?: string;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
}
declare class UserService {
    getAllUsers(query: GetAllUsersQuery): Promise<{
        users: (import("mongoose").Document<unknown, {}, IUser, {}, {}> & IUser & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        })[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    getUserById(id: string): Promise<IUser>;
    updateUser(id: string, updateData: Partial<IUser>, requestingUserId: string, requestingUserRole: string): Promise<IUser>;
    deleteUser(id: string): Promise<void>;
    changePassword(id: string, currentPassword: string, newPassword: string): Promise<void>;
}
declare const _default: UserService;
export default _default;
//# sourceMappingURL=user.service.d.ts.map