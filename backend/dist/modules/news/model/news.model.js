"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const newsSchema = new mongoose_1.Schema({
    title: { type: String, required: true, trim: true, maxlength: 500 },
    slug: { type: String, unique: true, lowercase: true },
    excerpt: { type: String, required: true, maxlength: 500 },
    content: { type: String, required: true, maxlength: 50000 },
    image: String,
    category: { type: String, required: true },
    author: { type: String, required: true },
    authorAvatar: String,
    tags: [String],
    readTime: String,
    featured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    publishedAt: Date,
}, { timestamps: true });
newsSchema.pre("save", function (next) {
    if (this.isModified("title")) {
        this.slug = this.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    }
    if (!this.readTime) {
        const words = this.content.split(/\s+/).length;
        this.readTime = `${Math.max(1, Math.ceil(words / 200))} min read`;
    }
    if (!this.publishedAt) {
        this.publishedAt = new Date();
    }
    next();
});
newsSchema.index({ category: 1, isActive: 1 });
newsSchema.index({ featured: 1 });
newsSchema.index({ publishedAt: -1 });
newsSchema.index({ title: "text", excerpt: "text", content: "text" });
const News = mongoose_1.default.model("News", newsSchema);
exports.default = News;
//# sourceMappingURL=news.model.js.map