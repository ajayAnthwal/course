"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteExam = exports.updateExam = exports.createExam = exports.getFeaturedExams = exports.getExamBySlug = exports.getExamById = exports.getAllExams = void 0;
const exam_service_1 = __importDefault(require("../service/exam.service"));
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
exports.getAllExams = (0, catchAsync_1.default)(async (req, res, _next) => {
    const result = await exam_service_1.default.getAllExams(req.query);
    res.status(200).json({ success: true, message: "Exams retrieved", data: result.exams, pagination: result.pagination });
});
exports.getExamById = (0, catchAsync_1.default)(async (req, res, _next) => {
    const exam = await exam_service_1.default.getExamById(req.params.id);
    res.status(200).json({ success: true, message: "Exam retrieved", data: exam });
});
exports.getExamBySlug = (0, catchAsync_1.default)(async (req, res, _next) => {
    const exam = await exam_service_1.default.getExamBySlug(req.params.slug);
    res.status(200).json({ success: true, message: "Exam retrieved", data: exam });
});
exports.getFeaturedExams = (0, catchAsync_1.default)(async (_req, res, _next) => {
    const exams = await exam_service_1.default.getFeaturedExams();
    res.status(200).json({ success: true, message: "Featured exams retrieved", data: exams });
});
exports.createExam = (0, catchAsync_1.default)(async (req, res, _next) => {
    const exam = await exam_service_1.default.createExam(req.body);
    res.status(201).json({ success: true, message: "Exam created", data: exam });
});
exports.updateExam = (0, catchAsync_1.default)(async (req, res, _next) => {
    const exam = await exam_service_1.default.updateExam(req.params.id, req.body);
    res.status(200).json({ success: true, message: "Exam updated", data: exam });
});
exports.deleteExam = (0, catchAsync_1.default)(async (req, res, _next) => {
    await exam_service_1.default.deleteExam(req.params.id);
    res.status(200).json({ success: true, message: "Exam deleted" });
});
//# sourceMappingURL=exam.controller.js.map