import { ITestimonial } from "../model/testimonial.model";
declare class TestimonialService {
    getAll(query: {
        page?: string;
        limit?: string;
    }): Promise<{
        testimonials: (import("mongoose").Document<unknown, {}, ITestimonial, {}, {}> & ITestimonial & Required<{
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
    getById(id: string): Promise<ITestimonial>;
    create(data: Partial<ITestimonial>): Promise<ITestimonial>;
    update(id: string, data: Partial<ITestimonial>): Promise<ITestimonial>;
    delete(id: string): Promise<void>;
}
declare const _default: TestimonialService;
export default _default;
//# sourceMappingURL=testimonial.service.d.ts.map