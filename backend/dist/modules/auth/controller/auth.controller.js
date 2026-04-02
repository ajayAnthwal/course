"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = exports.logout = exports.login = exports.register = void 0;
const auth_service_1 = __importDefault(require("../service/auth.service"));
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const config_1 = __importDefault(require("../../../config"));
const createSendToken = (user, token, statusCode, res) => {
    const cookieOptions = {
        expires: new Date(Date.now() + config_1.default.jwt.cookieExpiresIn * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: config_1.default.nodeEnv === "production",
        sameSite: "lax",
    };
    res.cookie("jwt", token, cookieOptions);
    res.status(statusCode).json({
        success: true,
        message: statusCode === 201 ? "Registration successful" : "Login successful",
        data: {
            user,
            token,
        },
    });
};
exports.register = (0, catchAsync_1.default)(async (req, res, _next) => {
    const { user, token } = await auth_service_1.default.register(req.body);
    createSendToken(user, token, 201, res);
});
exports.login = (0, catchAsync_1.default)(async (req, res, _next) => {
    const { user, token } = await auth_service_1.default.login(req.body);
    createSendToken(user, token, 200, res);
});
exports.logout = (0, catchAsync_1.default)(async (_req, res, _next) => {
    res.cookie("jwt", "", {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true,
    });
    res.status(200).json({
        success: true,
        message: "Logged out successfully",
    });
});
exports.getMe = (0, catchAsync_1.default)(async (req, res, _next) => {
    const user = await auth_service_1.default.getMe(req.user.id);
    res.status(200).json({
        success: true,
        message: "Current user retrieved successfully",
        data: user,
    });
});
//# sourceMappingURL=auth.controller.js.map