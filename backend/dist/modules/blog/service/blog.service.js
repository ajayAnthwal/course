"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const blog_model_1 = __importDefault(require("../model/blog.model"));
const appError_1 = __importDefault(require("../../../utils/appError"));
class BlogService {
    async getAll(query) {
        const page = parseInt(query.page || "1", 10);
        const limit = parseInt(query.limit || "12", 10);
        const skip = (page - 1) * limit;
        const filter = { isActive: true };
        if (query.search)
            filter.$text = { $search: query.search };
        if (query.category)
            filter.category = { $regex: query.category, $options: "i" };
        if (query.featured)
            filter.featured = query.featured === "true";
        const sort = {};
        if (query.sortBy) {
            sort[query.sortBy] = query.sortOrder === "desc" ? -1 : 1;
        }
        else {
            sort.publishedAt = -1;
        }
        const [blogs, total] = await Promise.all([
            blog_model_1.default.find(filter).sort(sort).skip(skip).limit(limit),
            blog_model_1.default.countDocuments(filter),
        ]);
        return { blogs, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } };
    }
    async getById(id) {
        const blog = await blog_model_1.default.findById(id);
        if (!blog)
            throw new appError_1.default("Blog not found", 404);
        return blog;
    }
    async getBySlug(slug) {
        const blog = await blog_model_1.default.findOne({ slug, isActive: true });
        if (!blog)
            throw new appError_1.default("Blog not found", 404);
        return blog;
    }
    async getFeatured() {
        return blog_model_1.default.find({ featured: true, isActive: true }).sort({ publishedAt: -1 }).limit(4);
    }
    async getLatest(limit = 6) {
        return blog_model_1.default.find({ isActive: true }).sort({ publishedAt: -1 }).limit(limit);
    }
    async create(data) {
        return blog_model_1.default.create(data);
    }
    async update(id, data) {
        const blog = await blog_model_1.default.findByIdAndUpdate(id, data, { new: true, runValidators: true });
        if (!blog)
            throw new appError_1.default("Blog not found", 404);
        return blog;
    }
    async delete(id) {
        const blog = await blog_model_1.default.findByIdAndDelete(id);
        if (!blog)
            throw new appError_1.default("Blog not found", 404);
    }
}
exports.default = new BlogService();
//# sourceMappingURL=blog.service.js.map