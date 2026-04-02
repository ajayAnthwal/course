"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNews = exports.updateNews = exports.createNews = exports.getLatestNews = exports.getFeaturedNews = exports.getNewsBySlug = exports.getNewsById = exports.getAllNews = void 0;
const news_service_1 = __importDefault(require("../service/news.service"));
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
exports.getAllNews = (0, catchAsync_1.default)(async (req, res, _next) => {
    const result = await news_service_1.default.getAllNews(req.query);
    res.status(200).json({ success: true, message: "Articles retrieved", data: result.articles, pagination: result.pagination });
});
exports.getNewsById = (0, catchAsync_1.default)(async (req, res, _next) => {
    const article = await news_service_1.default.getNewsById(req.params.id);
    res.status(200).json({ success: true, message: "Article retrieved", data: article });
});
exports.getNewsBySlug = (0, catchAsync_1.default)(async (req, res, _next) => {
    const article = await news_service_1.default.getNewsBySlug(req.params.slug);
    res.status(200).json({ success: true, message: "Article retrieved", data: article });
});
exports.getFeaturedNews = (0, catchAsync_1.default)(async (_req, res, _next) => {
    const articles = await news_service_1.default.getFeaturedNews();
    res.status(200).json({ success: true, message: "Featured articles retrieved", data: articles });
});
exports.getLatestNews = (0, catchAsync_1.default)(async (_req, res, _next) => {
    const articles = await news_service_1.default.getLatestNews(6);
    res.status(200).json({ success: true, message: "Latest articles retrieved", data: articles });
});
exports.createNews = (0, catchAsync_1.default)(async (req, res, _next) => {
    const article = await news_service_1.default.createNews(req.body);
    res.status(201).json({ success: true, message: "Article created", data: article });
});
exports.updateNews = (0, catchAsync_1.default)(async (req, res, _next) => {
    const article = await news_service_1.default.updateNews(req.params.id, req.body);
    res.status(200).json({ success: true, message: "Article updated", data: article });
});
exports.deleteNews = (0, catchAsync_1.default)(async (req, res, _next) => {
    await news_service_1.default.deleteNews(req.params.id);
    res.status(200).json({ success: true, message: "Article deleted" });
});
//# sourceMappingURL=news.controller.js.map