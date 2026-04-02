interface RegisterInput {
    name: string;
    email: string;
    password: string;
    role: string;
    phone?: string;
}
interface LoginInput {
    email: string;
    password: string;
}
declare class AuthService {
    register(input: RegisterInput): Promise<{
        user: import("mongoose").Document<unknown, {}, import("../../user/model/user.model").IUser, {}, {}> & import("../../user/model/user.model").IUser & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        };
        token: string;
    }>;
    login(input: LoginInput): Promise<{
        user: import("mongoose").Document<unknown, {}, import("../../user/model/user.model").IUser, {}, {}> & import("../../user/model/user.model").IUser & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        };
        token: string;
    }>;
    getMe(userId: string): Promise<import("mongoose").Document<unknown, {}, import("../../user/model/user.model").IUser, {}, {}> & import("../../user/model/user.model").IUser & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
}
declare const _default: AuthService;
export default _default;
//# sourceMappingURL=auth.service.d.ts.map