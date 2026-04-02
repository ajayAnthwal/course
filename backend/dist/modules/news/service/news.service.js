"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const news_model_1 = __importDefault(require("../model/news.model"));
const appError_1 = __importDefault(require("../../../utils/appError"));
class NewsService {
    async getAllNews(query) {
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
        const [articles, total] = await Promise.all([
            news_model_1.default.find(filter).sort(sort).skip(skip).limit(limit),
            news_model_1.default.countDocuments(filter),
        ]);
        return { articles, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } };
    }
    async getNewsById(id) {
        const article = await news_model_1.default.findById(id);
        if (!article)
            throw new appError_1.default("Article not found", 404);
        return article;
    }
    async getNewsBySlug(slug) {
        const article = await news_model_1.default.findOne({ slug, isActive: true });
        if (!article)
            throw new appError_1.default("Article not found", 404);
        return article;
    }
    async getFeaturedNews() {
        return news_model_1.default.find({ featured: true, isActive: true }).sort({ publishedAt: -1 }).limit(4);
    }
    async getLatestNews(limit = 6) {
        return news_model_1.default.find({ isActive: true }).sort({ publishedAt: -1 }).limit(limit);
    }
    async createNews(data) {
        return news_model_1.default.create(data);
    }
    async updateNews(id, data) {
        const article = await news_model_1.default.findByIdAndUpdate(id, data, { new: true, runValidators: true });
        if (!article)
            throw new appError_1.default("Article not found", 404);
        return article;
    }
    async deleteNews(id) {
        const article = await news_model_1.default.findByIdAndDelete(id);
        if (!article)
            throw new appError_1.default("Article not found", 404);
    }
}
exports.default = new NewsService();
//# sourceMappingURL=news.service.js.map