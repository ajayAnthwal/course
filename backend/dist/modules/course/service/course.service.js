"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const course_model_1 = __importDefault(require("../model/course.model"));
const appError_1 = __importDefault(require("../../../utils/appError"));
class CourseService {
    async getAllCourses(query) {
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
        const [courses, total] = await Promise.all([
            course_model_1.default.find(filter).sort(sort).skip(skip).limit(limit),
            course_model_1.default.countDocuments(filter),
        ]);
        return { courses, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } };
    }
    async getCourseById(id) {
        const course = await course_model_1.default.findById(id);
        if (!course)
            throw new appError_1.default("Course not found", 404);
        return course;
    }
    async getCourseBySlug(slug) {
        const course = await course_model_1.default.findOne({ slug, isActive: true });
        if (!course)
            throw new appError_1.default("Course not found", 404);
        return course;
    }
    async getFeaturedCourses() {
        return course_model_1.default.find({ featured: true, isActive: true }).sort({ rating: -1 }).limit(8);
    }
    async getCourseStats() {
        const [total, ug, pg] = await Promise.all([
            course_model_1.default.countDocuments({ isActive: true }),
            course_model_1.default.countDocuments({ level: "undergraduate", isActive: true }),
            course_model_1.default.countDocuments({ level: "postgraduate", isActive: true }),
        ]);
        return { total, undergraduate: ug, postgraduate: pg };
    }
    async createCourse(data) {
        return course_model_1.default.create(data);
    }
    async updateCourse(id, data) {
        const course = await course_model_1.default.findByIdAndUpdate(id, data, { new: true, runValidators: true });
        if (!course)
            throw new appError_1.default("Course not found", 404);
        return course;
    }
    async deleteCourse(id) {
        const course = await course_model_1.default.findByIdAndDelete(id);
        if (!course)
            throw new appError_1.default("Course not found", 404);
    }
}
exports.default = new CourseService();
//# sourceMappingURL=course.service.js.map