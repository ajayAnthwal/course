import { ICollege } from "../model/college.model";
interface GetCollegesQuery {
    page?: string;
    limit?: string;
    search?: string;
    city?: string;
    state?: string;
    type?: string;
    course?: string;
    minFees?: string;
    maxFees?: string;
    minRating?: string;
    featured?: string;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
}
declare class CollegeService {
    getAllColleges(query: GetCollegesQuery): Promise<{
        colleges: (import("mongoose").Document<unknown, {}, ICollege, {}, {}> & ICollege & Required<{
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
    getCollegeById(id: string): Promise<ICollege>;
    getCollegeBySlug(slug: string): Promise<ICollege>;
    createCollege(data: Partial<ICollege>): Promise<ICollege>;
    updateCollege(id: string, data: Partial<ICollege>): Promise<ICollege>;
    deleteCollege(id: string): Promise<void>;
    getFeaturedColleges(): Promise<ICollege[]>;
    getCollegeStats(): Promise<{
        total: number;
        government: number;
        private: number;
        featured: number;
    }>;
}
declare const _default: CollegeService;
export default _default;
//# sourceMappingURL=college.service.d.ts.map