import { Request, Response, NextFunction } from "express";
import { UserRole } from "../modules/user/model/user.model";
export interface AuthRequest extends Request {
    user?: {
        id: string;
        role: UserRole;
    };
}
export type AsyncHandler = (req: Request, res: Response, next: NextFunction) => Promise<void>;
export interface ApiResponse<T = unknown> {
    success: boolean;
    message: string;
    data?: T;
    error?: string;
}
export interface PaginationQuery {
    page?: string;
    limit?: string;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
}
export interface PaginatedResponse<T> {
    success: boolean;
    message: string;
    data: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}
//# sourceMappingURL=index.d.ts.map