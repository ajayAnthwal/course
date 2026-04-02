"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const exam_model_1 = __importDefault(require("../model/exam.model"));
const appError_1 = __importDefault(require("../../../utils/appError"));
class ExamService {
    async getAllExams(query) {
        const page = parseInt(query.page || "1", 10);
        const limit = parseInt(query.limit || "12", 10);
        const skip = (page - 1) * limit;
        const filter = { isActive: true };
        if (query.search)
            filter.$text = { $search: query.search };
        if (query.category)
            filter.category = { $regex: query.category, $options: "i" };
        if (query.level)
            filter.level = query.level;
        if (query.featured)
            filter.featured = query.featured === "true";
        const sort = {};
        if (query.sortBy) {
            sort[query.sortBy] = query.sortOrder === "desc" ? -1 : 1;
        }
        else {
            sort.featured = -1;
            sort.rating = -1;
        }
        const [exams, total] = await Promise.all([
            exam_model_1.default.find(filter).sort(sort).skip(skip).limit(limit),
            exam_model_1.default.countDocuments(filter),
        ]);
        return { exams, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } };
    }
    async getExamById(id) {
        const exam = await exam_model_1.default.findById(id);
        if (!exam)
            throw new appError_1.default("Exam not found", 404);
        return exam;
    }
    async getExamBySlug(slug) {
        const exam = await exam_model_1.default.findOne({ slug, isActive: true });
        if (!exam)
            throw new appError_1.default("Exam not found", 404);
        return exam;
    }
    async getFeaturedExams() {
        return exam_model_1.default.find({ featured: true, isActive: true }).sort({ rating: -1 }).limit(8);
    }
    async createExam(data) {
        return exam_model_1.default.create(data);
    }
    async updateExam(id, data) {
        const exam = await exam_model_1.default.findByIdAndUpdate(id, data, { new: true, runValidators: true });
        if (!exam)
            throw new appError_1.default("Exam not found", 404);
        return exam;
    }
    async deleteExam(id) {
        const exam = await exam_model_1.default.findByIdAndDelete(id);
        if (!exam)
            throw new appError_1.default("Exam not found", 404);
    }
}
exports.default = new ExamService();
//# sourceMappingURL=exam.service.js.map