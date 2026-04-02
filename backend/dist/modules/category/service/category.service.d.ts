import { ICategory } from "../model/category.model";
declare class CategoryService {
    getAll(query: {
        page?: string;
        limit?: string;
        search?: string;
    }): Promise<{
        categories: (import("mongoose").Document<unknown, {}, ICategory, {}, {}> & ICategory & Required<{
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
    getById(id: string): Promise<ICategory>;
    create(data: Partial<ICategory>): Promise<ICategory>;
    update(id: string, data: Partial<ICategory>): Promise<ICategory>;
    delete(id: string): Promise<void>;
}
declare const _default: CategoryService;
export default _default;
//# sourceMappingURL=category.service.d.ts.map