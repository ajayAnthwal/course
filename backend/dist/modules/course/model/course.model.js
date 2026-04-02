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
const courseSchema = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true, maxlength: 300 },
    slug: { type: String, unique: true, lowercase: true },
    shortName: { type: String, trim: true },
    description: { type: String, required: true, maxlength: 10000 },
    image: String,
    category: { type: String, required: true },
    level: {
        type: String,
        enum: ["undergraduate", "postgraduate", "diploma", "doctorate", "certificate"],
        required: true,
    },
    duration: { type: String, required: true },
    durationYears: { type: Number, required: true },
    eligibility: { type: String, required: true },
    admissionProcess: String,
    syllabus: [{ semester: String, subjects: [String] }],
    careerOpportunities: [String],
    averageSalary: { min: Number, max: Number, currency: { type: String, default: "INR" } },
    topRecruiters: [String],
    fees: { min: Number, max: Number, currency: { type: String, default: "INR" } },
    entranceExams: [String],
    specializations: [String],
    collegeCount: { type: Number, default: 0 },
    rating: { type: Number, min: 0, max: 5, default: 0 },
    featured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });
courseSchema.pre("save", function (next) {
    if (this.isModified("name")) {
        this.slug = this.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    }
    next();
});
courseSchema.index({ category: 1, isActive: 1 });
courseSchema.index({ featured: 1 });
courseSchema.index({ name: "text", description: "text" });
const Course = mongoose_1.default.model("Course", courseSchema);
exports.default = Course;
//# sourceMappingURL=course.model.js.map