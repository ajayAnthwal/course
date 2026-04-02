"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBlog = exports.updateBlog = exports.createBlog = exports.getLatestBlogs = exports.getFeaturedBlogs = exports.getBlogBySlug = exports.getBlogById = exports.getAllBlogs = void 0;
const blog_service_1 = __importDefault(require("../service/blog.service"));
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
exports.getAllBlogs = (0, catchAsync_1.default)(async (req, res, _next) => {
    const result = await blog_service_1.default.getAll(req.query);
    res.status(200).json({ success: true, message: "Blogs retrieved", data: result.blogs, pagination: result.pagination });
});
exports.getBlogById = (0, catchAsync_1.default)(async (req, res, _next) => {
    const blog = await blog_service_1.default.getById(req.params.id);
    res.status(200).json({ success: true, message: "Blog retrieved", data: blog });
});
exports.getBlogBySlug = (0, catchAsync_1.default)(async (req, res, _next) => {
    const blog = await blog_service_1.default.getBySlug(req.params.slug);
    res.status(200).json({ success: true, message: "Blog retrieved", data: blog });
});
exports.getFeaturedBlogs = (0, catchAsync_1.default)(async (_req, res, _next) => {
    const blogs = await blog_service_1.default.getFeatured();
    res.status(200).json({ success: true, message: "Featured blogs retrieved", data: blogs });
});
exports.getLatestBlogs = (0, catchAsync_1.default)(async (_req, res, _next) => {
    const blogs = await blog_service_1.default.getLatest(6);
    res.status(200).json({ success: true, message: "Latest blogs retrieved", data: blogs });
});
exports.createBlog = (0, catchAsync_1.default)(async (req, res, _next) => {
    const data = { ...req.body };
    if (req.file)
        data.image = `/uploads/${req.file.filename}`;
    const blog = await blog_service_1.default.create(data);
    res.status(201).json({ success: true, message: "Blog created", data: blog });
});
exports.updateBlog = (0, catchAsync_1.default)(async (req, res, _next) => {
    const data = { ...req.body };
    if (req.file)
        data.image = `/uploads/${req.file.filename}`;
    const blog = await blog_service_1.default.update(req.params.id, data);
    res.status(200).json({ success: true, message: "Blog updated", data: blog });
});
exports.deleteBlog = (0, catchAsync_1.default)(async (req, res, _next) => {
    await blog_service_1.default.delete(req.params.id);
    res.status(200).json({ success: true, message: "Blog deleted" });
});
//# sourceMappingURL=blog.controller.js.map