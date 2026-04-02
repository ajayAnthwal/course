"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCourse = exports.updateCourse = exports.createCourse = exports.getCourseStats = exports.getFeaturedCourses = exports.getCourseBySlug = exports.getCourseById = exports.getAllCourses = void 0;
const course_service_1 = __importDefault(require("../service/course.service"));
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
exports.getAllCourses = (0, catchAsync_1.default)(async (req, res, _next) => {
    const result = await course_service_1.default.getAllCourses(req.query);
    res.status(200).json({ success: true, message: "Courses retrieved", data: result.courses, pagination: result.pagination });
});
exports.getCourseById = (0, catchAsync_1.default)(async (req, res, _next) => {
    const course = await course_service_1.default.getCourseById(req.params.id);
    res.status(200).json({ success: true, message: "Course retrieved", data: course });
});
exports.getCourseBySlug = (0, catchAsync_1.default)(async (req, res, _next) => {
    const course = await course_service_1.default.getCourseBySlug(req.params.slug);
    res.status(200).json({ success: true, message: "Course retrieved", data: course });
});
exports.getFeaturedCourses = (0, catchAsync_1.default)(async (_req, res, _next) => {
    const courses = await course_service_1.default.getFeaturedCourses();
    res.status(200).json({ success: true, message: "Featured courses retrieved", data: courses });
});
exports.getCourseStats = (0, catchAsync_1.default)(async (_req, res, _next) => {
    const stats = await course_service_1.default.getCourseStats();
    res.status(200).json({ success: true, message: "Course stats retrieved", data: stats });
});
exports.createCourse = (0, catchAsync_1.default)(async (req, res, _next) => {
    const course = await course_service_1.default.createCourse(req.body);
    res.status(201).json({ success: true, message: "Course created", data: course });
});
exports.updateCourse = (0, catchAsync_1.default)(async (req, res, _next) => {
    const course = await course_service_1.default.updateCourse(req.params.id, req.body);
    res.status(200).json({ success: true, message: "Course updated", data: course });
});
exports.deleteCourse = (0, catchAsync_1.default)(async (req, res, _next) => {
    await course_service_1.default.deleteCourse(req.params.id);
    res.status(200).json({ success: true, message: "Course deleted" });
});
//# sourceMappingURL=course.controller.js.map