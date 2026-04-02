"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCollegeStats = exports.getFeaturedColleges = exports.deleteCollege = exports.updateCollege = exports.createCollege = exports.getCollegeBySlug = exports.getCollegeById = exports.getAllColleges = void 0;
const college_service_1 = __importDefault(require("../service/college.service"));
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
exports.getAllColleges = (0, catchAsync_1.default)(async (req, res, _next) => {
    const result = await college_service_1.default.getAllColleges(req.query);
    res.status(200).json({
        success: true,
        message: "Colleges retrieved successfully",
        data: result.colleges,
        pagination: result.pagination,
    });
});
exports.getCollegeById = (0, catchAsync_1.default)(async (req, res, _next) => {
    const college = await college_service_1.default.getCollegeById(req.params.id);
    res.status(200).json({
        success: true,
        message: "College retrieved successfully",
        data: college,
    });
});
exports.getCollegeBySlug = (0, catchAsync_1.default)(async (req, res, _next) => {
    const college = await college_service_1.default.getCollegeBySlug(req.params.slug);
    res.status(200).json({
        success: true,
        message: "College retrieved successfully",
        data: college,
    });
});
exports.createCollege = (0, catchAsync_1.default)(async (req, res, _next) => {
    const college = await college_service_1.default.createCollege(req.body);
    res.status(201).json({
        success: true,
        message: "College created successfully",
        data: college,
    });
});
exports.updateCollege = (0, catchAsync_1.default)(async (req, res, _next) => {
    const college = await college_service_1.default.updateCollege(req.params.id, req.body);
    res.status(200).json({
        success: true,
        message: "College updated successfully",
        data: college,
    });
});
exports.deleteCollege = (0, catchAsync_1.default)(async (req, res, _next) => {
    await college_service_1.default.deleteCollege(req.params.id);
    res.status(200).json({
        success: true,
        message: "College deleted successfully",
    });
});
exports.getFeaturedColleges = (0, catchAsync_1.default)(async (_req, res, _next) => {
    const colleges = await college_service_1.default.getFeaturedColleges();
    res.status(200).json({
        success: true,
        message: "Featured colleges retrieved successfully",
        data: colleges,
    });
});
exports.getCollegeStats = (0, catchAsync_1.default)(async (_req, res, _next) => {
    const stats = await college_service_1.default.getCollegeStats();
    res.status(200).json({
        success: true,
        message: "College stats retrieved successfully",
        data: stats,
    });
});
//# sourceMappingURL=college.controller.js.map