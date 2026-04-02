"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.createCategory = exports.getCategoryById = exports.getAllCategories = void 0;
const category_service_1 = __importDefault(require("../service/category.service"));
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
exports.getAllCategories = (0, catchAsync_1.default)(async (req, res, _next) => {
    const result = await category_service_1.default.getAll(req.query);
    res.status(200).json({ success: true, message: "Categories retrieved", data: result.categories, pagination: result.pagination });
});
exports.getCategoryById = (0, catchAsync_1.default)(async (req, res, _next) => {
    const category = await category_service_1.default.getById(req.params.id);
    res.status(200).json({ success: true, message: "Category retrieved", data: category });
});
exports.createCategory = (0, catchAsync_1.default)(async (req, res, _next) => {
    const data = { ...req.body };
    if (req.file)
        data.image = `/uploads/${req.file.filename}`;
    const category = await category_service_1.default.create(data);
    res.status(201).json({ success: true, message: "Category created", data: category });
});
exports.updateCategory = (0, catchAsync_1.default)(async (req, res, _next) => {
    const data = { ...req.body };
    if (req.file)
        data.image = `/uploads/${req.file.filename}`;
    const category = await category_service_1.default.update(req.params.id, data);
    res.status(200).json({ success: true, message: "Category updated", data: category });
});
exports.deleteCategory = (0, catchAsync_1.default)(async (req, res, _next) => {
    await category_service_1.default.delete(req.params.id);
    res.status(200).json({ success: true, message: "Category deleted" });
});
//# sourceMappingURL=category.controller.js.map