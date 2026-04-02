"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const testimonial_model_1 = __importDefault(require("../model/testimonial.model"));
const appError_1 = __importDefault(require("../../../utils/appError"));
class TestimonialService {
    async getAll(query) {
        const page = parseInt(query.page || "1", 10);
        const limit = parseInt(query.limit || "20", 10);
        const skip = (page - 1) * limit;
        const filter = { isActive: true };
        const [testimonials, total] = await Promise.all([
            testimonial_model_1.default.find(filter).sort({ rating: -1, createdAt: -1 }).skip(skip).limit(limit),
            testimonial_model_1.default.countDocuments(filter),
        ]);
        return { testimonials, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } };
    }
    async getById(id) {
        const testimonial = await testimonial_model_1.default.findById(id);
        if (!testimonial)
            throw new appError_1.default("Testimonial not found", 404);
        return testimonial;
    }
    async create(data) {
        return testimonial_model_1.default.create(data);
    }
    async update(id, data) {
        const testimonial = await testimonial_model_1.default.findByIdAndUpdate(id, data, { new: true, runValidators: true });
        if (!testimonial)
            throw new appError_1.default("Testimonial not found", 404);
        return testimonial;
    }
    async delete(id) {
        const testimonial = await testimonial_model_1.default.findByIdAndDelete(id);
        if (!testimonial)
            throw new appError_1.default("Testimonial not found", 404);
    }
}
exports.default = new TestimonialService();
//# sourceMappingURL=testimonial.service.js.map