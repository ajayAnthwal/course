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
const collegeSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "College name is required"],
        trim: true,
        maxlength: [200, "College name cannot exceed 200 characters"],
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true,
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        maxlength: [5000, "Description cannot exceed 5000 characters"],
    },
    logo: String,
    coverImage: String,
    location: {
        city: { type: String, required: true },
        state: { type: String, required: true },
        country: { type: String, default: "India" },
        address: String,
        pincode: String,
    },
    type: {
        type: String,
        enum: ["government", "private", "deemed", "autonomous"],
        required: true,
    },
    establishedYear: {
        type: Number,
        required: true,
    },
    approvedBy: [String],
    courses: [
        {
            name: { type: String, required: true },
            duration: String,
            fees: {
                min: Number,
                max: Number,
                currency: { type: String, default: "INR" },
            },
            level: {
                type: String,
                enum: ["undergraduate", "postgraduate", "diploma", "doctorate"],
            },
        },
    ],
    facilities: [String],
    rankings: [
        {
            source: String,
            rank: Number,
            year: Number,
        },
    ],
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0,
    },
    reviewCount: {
        type: Number,
        default: 0,
    },
    nirf: {
        overall: { type: Number, default: 0 },
        engineering: { type: Number, default: 0 },
        management: { type: Number, default: 0 },
        pharmacy: { type: Number, default: 0 },
        medical: { type: Number, default: 0 },
    },
    entranceExams: [String],
    website: String,
    email: String,
    phone: String,
    featured: {
        type: Boolean,
        default: false,
    },
    verified: {
        type: Boolean,
        default: false,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});
collegeSchema.pre("save", function (next) {
    if (this.isModified("name")) {
        this.slug = this.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");
    }
    next();
});
collegeSchema.index({ "location.city": 1, "location.state": 1 });
collegeSchema.index({ type: 1 });
collegeSchema.index({ featured: 1 });
collegeSchema.index({ rating: -1 });
collegeSchema.index({ name: "text", description: "text" });
const College = mongoose_1.default.model("College", collegeSchema);
exports.default = College;
//# sourceMappingURL=college.model.js.map