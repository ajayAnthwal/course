import { INews } from "../model/news.model";
interface GetNewsQuery {
    page?: string;
    limit?: string;
    search?: string;
    category?: string;
    featured?: string;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
}
declare class NewsService {
    getAllNews(query: GetNewsQuery): Promise<{
        articles: (import("mongoose").Document<unknown, {}, INews, {}, {}> & INews & Required<{
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
    getNewsById(id: string): Promise<INews>;
    getNewsBySlug(slug: string): Promise<INews>;
    getFeaturedNews(): Promise<INews[]>;
    getLatestNews(limit?: number): Promise<INews[]>;
    createNews(data: Partial<INews>): Promise<INews>;
    updateNews(id: string, data: Partial<INews>): Promise<INews>;
    deleteNews(id: string): Promise<void>;
}
declare const _default: NewsService;
export default _default;
//# sourceMappingURL=news.service.d.ts.map