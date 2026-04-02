"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const college_model_1 = __importDefault(require("../model/college.model"));
const appError_1 = __importDefault(require("../../../utils/appError"));
class CollegeService {
    async getAllColleges(query) {
        const page = parseInt(query.page || "1", 10);
        const limit = parseInt(query.limit || "12", 10);
        const skip = (page - 1) * limit;
        const filter = { isActive: true };
        if (query.search) {
            filter.$text = { $search: query.search };
        }
        if (query.city)
            filter["location.city"] = { $regex: query.city, $options: "i" };
        if (query.state)
            filter["location.state"] = { $regex: query.state, $options: "i" };
        if (query.type)
            filter.type = query.type;
        if (query.course)
            filter["courses.name"] = { $regex: query.course, $options: "i" };
        if (query.minRating)
            filter.rating = { $gte: parseFloat(query.minRating) };
        if (query.featured)
            filter.featured = query.featured === "true";
        if (query.minFees || query.maxFees) {
            if (query.minFees)
                filter["courses.fees.min"] = { $gte: parseInt(query.minFees, 10) };
            if (query.maxFees)
                filter["courses.fees.max"] = { $lte: parseInt(query.maxFees, 10) };
        }
        const sort = {};
        if (query.sortBy) {
            sort[query.sortBy] = query.sortOrder === "desc" ? -1 : 1;
        }
        else {
            sort.featured = -1;
            sort.rating = -1;
        }
        const [colleges, total] = await Promise.all([
            college_model_1.default.find(filter).sort(sort).skip(skip).limit(limit),
            college_model_1.default.countDocuments(filter),
        ]);
        return {
            colleges,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async getCollegeById(id) {
        const college = await college_model_1.default.findById(id);
        if (!college)
            throw new appError_1.default("College not found", 404);
        return college;
    }
    async getCollegeBySlug(slug) {
        const college = await college_model_1.default.findOne({ slug });
        if (!college)
            throw new appError_1.default("College not found", 404);
        return college;
    }
    async createCollege(data) {
        const college = await college_model_1.default.create(data);
        return college;
    }
    async updateCollege(id, data) {
        const college = await college_model_1.default.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true,
        });
        if (!college)
            throw new appError_1.default("College not found", 404);
        return college;
    }
    async deleteCollege(id) {
        const college = await college_model_1.default.findByIdAndDelete(id);
        if (!college)
            throw new appError_1.default("College not found", 404);
    }
    async getFeaturedColleges() {
        return college_model_1.default.find({ featured: true, isActive: true })
            .sort({ rating: -1 })
            .limit(8);
    }
    async getCollegeStats() {
        const [total, government, privateCount, featured] = await Promise.all([
            college_model_1.default.countDocuments({ isActive: true }),
            college_model_1.default.countDocuments({ type: "government", isActive: true }),
            college_model_1.default.countDocuments({ type: "private", isActive: true }),
            college_model_1.default.countDocuments({ featured: true, isActive: true }),
        ]);
        return { total, government, private: privateCount, featured };
    }
}
exports.default = new CollegeService();
//# sourceMappingURL=college.service.js.map