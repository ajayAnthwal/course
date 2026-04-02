"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = exports.changePassword = exports.deleteUser = exports.updateUser = exports.getUserById = exports.getAllUsers = void 0;
const user_service_1 = __importDefault(require("../service/user.service"));
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
exports.getAllUsers = (0, catchAsync_1.default)(async (req, res, _next) => {
    const result = await user_service_1.default.getAllUsers(req.query);
    res.status(200).json({
        success: true,
        message: "Users retrieved successfully",
        data: result.users,
        pagination: result.pagination,
    });
});
exports.getUserById = (0, catchAsync_1.default)(async (req, res, _next) => {
    const user = await user_service_1.default.getUserById(req.params.id);
    res.status(200).json({
        success: true,
        message: "User retrieved successfully",
        data: user,
    });
});
exports.updateUser = (0, catchAsync_1.default)(async (req, res, _next) => {
    const user = await user_service_1.default.updateUser(req.params.id, req.body, req.user.id, req.user.role);
    res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: user,
    });
});
exports.deleteUser = (0, catchAsync_1.default)(async (req, res, _next) => {
    await user_service_1.default.deleteUser(req.params.id);
    res.status(200).json({
        success: true,
        message: "User deleted successfully",
    });
});
exports.changePassword = (0, catchAsync_1.default)(async (req, res, _next) => {
    await user_service_1.default.changePassword(req.user.id, req.body.currentPassword, req.body.newPassword);
    res.status(200).json({
        success: true,
        message: "Password changed successfully",
    });
});
exports.getMe = (0, catchAsync_1.default)(async (req, res, _next) => {
    const user = await user_service_1.default.getUserById(req.user.id);
    res.status(200).json({
        success: true,
        message: "Current user retrieved successfully",
        data: user,
    });
});
//# sourceMappingURL=user.controller.js.map