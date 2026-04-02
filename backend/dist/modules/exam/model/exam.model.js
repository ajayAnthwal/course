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
const examSchema = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true, maxlength: 200 },
    slug: { type: String, unique: true, lowercase: true },
    fullName: { type: String, required: true },
    description: { type: String, required: true, maxlength: 10000 },
    image: String,
    category: { type: String, required: true },
    level: { type: String, enum: ["national", "state", "university"], required: true },
    conductingBody: { type: String, required: true },
    mode: { type: String, enum: ["computer-based", "pen-paper", "both"], required: true },
    frequency: String,
    eligibility: { type: String, required: true },
    syllabus: [{ subject: String, topics: [String] }],
    examPattern: [{ section: String, questions: Number, marks: Number, duration: String }],
    importantDates: [{ event: String, date: String }],
    registrationFee: { amount: Number, currency: { type: String, default: "INR" } },
    website: String,
    applicants: String,
    totalMarks: Number,
    duration: String,
    languages: [String],
    rating: { type: Number, min: 0, max: 5, default: 0 },
    featured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });
examSchema.pre("save", function (next) {
    if (this.isModified("name")) {
        this.slug = this.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    }
    next();
});
examSchema.index({ category: 1, isActive: 1 });
examSchema.index({ featured: 1 });
examSchema.index({ name: "text", description: "text" });
const Exam = mongoose_1.default.model("Exam", examSchema);
exports.default = Exam;
//# sourceMappingURL=exam.model.js.map