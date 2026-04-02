"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const category_model_1 = __importDefault(require("../model/category.model"));
const appError_1 = __importDefault(require("../../../utils/appError"));
class CategoryService {
    async getAll(query) {
        const page = parseInt(query.page || "1", 10);
        const limit = parseInt(query.limit || "50", 10);
        const skip = (page - 1) * limit;
        const filter = {};
        if (query.search)
            filter.name = { $regex: query.search, $options: "i" };
        const [categories, total] = await Promise.all([
            category_model_1.default.find(filter).sort({ count: -1, name: 1 }).skip(skip).limit(limit),
            category_model_1.default.countDocuments(filter),
        ]);
        return { categories, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } };
    }
    async getById(id) {
        const category = await category_model_1.default.findById(id);
        if (!category)
            throw new appError_1.default("Category not found", 404);
        return category;
    }
    async create(data) {
        return category_model_1.default.create(data);
    }
    async update(id, data) {
        const category = await category_model_1.default.findByIdAndUpdate(id, data, { new: true, runValidators: true });
        if (!category)
            throw new appError_1.default("Category not found", 404);
        return category;
    }
    async delete(id) {
        const category = await category_model_1.default.findByIdAndDelete(id);
        if (!category)
            throw new appError_1.default("Category not found", 404);
    }
}
exports.default = new CategoryService();
//# sourceMappingURL=category.service.js.map