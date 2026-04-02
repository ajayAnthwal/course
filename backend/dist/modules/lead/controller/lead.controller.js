"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLeadStats = exports.deleteLead = exports.updateLead = exports.createLead = exports.getLeadById = exports.getAllLeads = void 0;
const lead_service_1 = __importDefault(require("../service/lead.service"));
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
exports.getAllLeads = (0, catchAsync_1.default)(async (req, res, _next) => {
    const result = await lead_service_1.default.getAllLeads(req.query, req.user?.id, req.user?.role);
    res.status(200).json({
        success: true,
        message: "Leads retrieved successfully",
        data: result.leads,
        pagination: result.pagination,
    });
});
exports.getLeadById = (0, catchAsync_1.default)(async (req, res, _next) => {
    const lead = await lead_service_1.default.getLeadById(req.params.id);
    res.status(200).json({
        success: true,
        message: "Lead retrieved successfully",
        data: lead,
    });
});
exports.createLead = (0, catchAsync_1.default)(async (req, res, _next) => {
    const lead = await lead_service_1.default.createLead(req.body, req.user?.id);
    res.status(201).json({
        success: true,
        message: "Lead created successfully",
        data: lead,
    });
});
exports.updateLead = (0, catchAsync_1.default)(async (req, res, _next) => {
    const lead = await lead_service_1.default.updateLead(req.params.id, req.body);
    res.status(200).json({
        success: true,
        message: "Lead updated successfully",
        data: lead,
    });
});
exports.deleteLead = (0, catchAsync_1.default)(async (req, res, _next) => {
    await lead_service_1.default.deleteLead(req.params.id);
    res.status(200).json({
        success: true,
        message: "Lead deleted successfully",
    });
});
exports.getLeadStats = (0, catchAsync_1.default)(async (_req, res, _next) => {
    const stats = await lead_service_1.default.getLeadStats();
    res.status(200).json({
        success: true,
        message: "Lead stats retrieved successfully",
        data: stats,
    });
});
//# sourceMappingURL=lead.controller.js.map