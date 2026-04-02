"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTestimonial = exports.updateTestimonial = exports.createTestimonial = exports.getTestimonialById = exports.getAllTestimonials = void 0;
const testimonial_service_1 = __importDefault(require("../service/testimonial.service"));
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
exports.getAllTestimonials = (0, catchAsync_1.default)(async (req, res, _next) => {
    const result = await testimonial_service_1.default.getAll(req.query);
    res.status(200).json({ success: true, message: "Testimonials retrieved", data: result.testimonials, pagination: result.pagination });
});
exports.getTestimonialById = (0, catchAsync_1.default)(async (req, res, _next) => {
    const testimonial = await testimonial_service_1.default.getById(req.params.id);
    res.status(200).json({ success: true, message: "Testimonial retrieved", data: testimonial });
});
exports.createTestimonial = (0, catchAsync_1.default)(async (req, res, _next) => {
    const data = { ...req.body };
    if (req.file)
        data.avatar = `/uploads/${req.file.filename}`;
    const testimonial = await testimonial_service_1.default.create(data);
    res.status(201).json({ success: true, message: "Testimonial created", data: testimonial });
});
exports.updateTestimonial = (0, catchAsync_1.default)(async (req, res, _next) => {
    const data = { ...req.body };
    if (req.file)
        data.avatar = `/uploads/${req.file.filename}`;
    const testimonial = await testimonial_service_1.default.update(req.params.id, data);
    res.status(200).json({ success: true, message: "Testimonial updated", data: testimonial });
});
exports.deleteTestimonial = (0, catchAsync_1.default)(async (req, res, _next) => {
    await testimonial_service_1.default.delete(req.params.id);
    res.status(200).json({ success: true, message: "Testimonial deleted" });
});
//# sourceMappingURL=testimonial.controller.js.map