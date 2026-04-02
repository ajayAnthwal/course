import { ICourse } from "../model/course.model";
interface GetCoursesQuery {
    page?: string;
    limit?: string;
    search?: string;
    category?: string;
    level?: string;
    featured?: string;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
}
declare class CourseService {
    getAllCourses(query: GetCoursesQuery): Promise<{
        courses: (import("mongoose").Document<unknown, {}, ICourse, {}, {}> & ICourse & Required<{
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
    getCourseById(id: string): Promise<ICourse>;
    getCourseBySlug(slug: string): Promise<ICourse>;
    getFeaturedCourses(): Promise<ICourse[]>;
    getCourseStats(): Promise<{
        total: number;
        undergraduate: number;
        postgraduate: number;
    }>;
    createCourse(data: Partial<ICourse>): Promise<ICourse>;
    updateCourse(id: string, data: Partial<ICourse>): Promise<ICourse>;
    deleteCourse(id: string): Promise<void>;
}
declare const _default: CourseService;
export default _default;
//# sourceMappingURL=course.service.d.ts.map