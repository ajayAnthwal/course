"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.restrictTo = exports.protect = void 0;
const jwt_1 = require("../utils/jwt");
const appError_1 = __importDefault(require("../utils/appError"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const user_model_1 = __importDefault(require("../modules/user/model/user.model"));
exports.protect = (0, catchAsync_1.default)(async (req, res, next) => {
    let token;
    if (req.headers.authorization?.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }
    else if (req.cookies?.jwt) {
        token = req.cookies.jwt;
    }
    if (!token) {
        return next(new appError_1.default("You are not logged in. Please log in to get access.", 401));
    }
    const decoded = (0, jwt_1.verifyToken)(token);
    const currentUser = await user_model_1.default.findById(decoded.id);
    if (!currentUser) {
        return next(new appError_1.default("The user belonging to this token no longer exists.", 401));
    }
    req.user = { id: currentUser._id.toString(), role: currentUser.role };
    next();
});
const restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return next(new appError_1.default("You do not have permission to perform this action.", 403));
        }
        next();
    };
};
exports.restrictTo = restrictTo;
//# sourceMappingURL=auth.js.map