import { IExam } from "../model/exam.model";
interface GetExamsQuery {
    page?: string;
    limit?: string;
    search?: string;
    category?: string;
    level?: string;
    featured?: string;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
}
declare class ExamService {
    getAllExams(query: GetExamsQuery): Promise<{
        exams: (import("mongoose").Document<unknown, {}, IExam, {}, {}> & IExam & Required<{
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
    getExamById(id: string): Promise<IExam>;
    getExamBySlug(slug: string): Promise<IExam>;
    getFeaturedExams(): Promise<IExam[]>;
    createExam(data: Partial<IExam>): Promise<IExam>;
    updateExam(id: string, data: Partial<IExam>): Promise<IExam>;
    deleteExam(id: string): Promise<void>;
}
declare const _default: ExamService;
export default _default;
//# sourceMappingURL=exam.service.d.ts.map