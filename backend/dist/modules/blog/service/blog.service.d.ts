import { IBlog } from "../model/blog.model";
interface GetBlogQuery {
    page?: string;
    limit?: string;
    search?: string;
    category?: string;
    featured?: string;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
}
declare class BlogService {
    getAll(query: GetBlogQuery): Promise<{
        blogs: (import("mongoose").Document<unknown, {}, IBlog, {}, {}> & IBlog & Required<{
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
    getById(id: string): Promise<IBlog>;
    getBySlug(slug: string): Promise<IBlog>;
    getFeatured(): Promise<IBlog[]>;
    getLatest(limit?: number): Promise<IBlog[]>;
    create(data: Partial<IBlog>): Promise<IBlog>;
    update(id: string, data: Partial<IBlog>): Promise<IBlog>;
    delete(id: string): Promise<void>;
}
declare const _default: BlogService;
export default _default;
//# sourceMappingURL=blog.service.d.ts.map