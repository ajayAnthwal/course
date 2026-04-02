"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lead_model_1 = __importDefault(require("../model/lead.model"));
const appError_1 = __importDefault(require("../../../utils/appError"));
const sms_service_1 = __importDefault(require("../../../services/sms/sms.service"));
class LeadService {
    async getAllLeads(query, userId, userRole) {
        const page = parseInt(query.page || "1", 10);
        const limit = parseInt(query.limit || "10", 10);
        const skip = (page - 1) * limit;
        const filter = {};
        if (userRole === "college") {
            filter.assignedTo = userId;
        }
        else if (userRole === "student") {
            filter.createdBy = userId;
        }
        if (query.status)
            filter.status = query.status;
        if (query.college)
            filter.college = query.college;
        if (query.search) {
            filter.$or = [
                { name: { $regex: query.search, $options: "i" } },
                { email: { $regex: query.search, $options: "i" } },
                { phone: { $regex: query.search, $options: "i" } },
            ];
        }
        const sort = {};
        if (query.sortBy) {
            sort[query.sortBy] = query.sortOrder === "desc" ? -1 : 1;
        }
        else {
            sort.createdAt = -1;
        }
        const [leads, total] = await Promise.all([
            lead_model_1.default.find(filter)
                .populate("college", "name slug logo")
                .populate("assignedTo", "name email")
                .sort(sort)
                .skip(skip)
                .limit(limit),
            lead_model_1.default.countDocuments(filter),
        ]);
        return {
            leads,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async getLeadById(id) {
        const lead = await lead_model_1.default.findById(id)
            .populate("college", "name slug logo")
            .populate("assignedTo", "name email");
        if (!lead)
            throw new appError_1.default("Lead not found", 404);
        return lead;
    }
    async createLead(data, userId) {
        const lead = await lead_model_1.default.create({ ...data, createdBy: userId });
        const populated = await lead.populate("college", "name slug logo");
        // Fire-and-forget SMS — never block lead creation on SMS failure
        this.sendLeadConfirmationSms(populated).catch((err) => console.error("[LeadService] SMS error:", err.message));
        return populated;
    }
    async updateLead(id, data) {
        const lead = await lead_model_1.default.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true,
        })
            .populate("college", "name slug logo")
            .populate("assignedTo", "name email");
        if (!lead)
            throw new appError_1.default("Lead not found", 404);
        // Send status update SMS if status changed
        if (data.status) {
            this.sendStatusUpdateSms(lead).catch((err) => console.error("[LeadService] SMS error:", err.message));
        }
        return lead;
    }
    async deleteLead(id) {
        const lead = await lead_model_1.default.findByIdAndDelete(id);
        if (!lead)
            throw new appError_1.default("Lead not found", 404);
    }
    async getLeadStats() {
        const [total, newLeads, contacted, interested, admitted] = await Promise.all([
            lead_model_1.default.countDocuments(),
            lead_model_1.default.countDocuments({ status: "new" }),
            lead_model_1.default.countDocuments({ status: "contacted" }),
            lead_model_1.default.countDocuments({ status: "interested" }),
            lead_model_1.default.countDocuments({ status: "admitted" }),
        ]);
        return { total, new: newLeads, contacted, interested, admitted };
    }
    // ── SMS helpers ──────────────────────────────────────────────
    getCollegeName(lead) {
        if (lead.college && typeof lead.college === "object" && "name" in lead.college) {
            return String(lead.college.name);
        }
        return "your selected college";
    }
    async sendLeadConfirmationSms(lead) {
        const collegeName = this.getCollegeName(lead);
        await sms_service_1.default.send({
            to: lead.phone,
            template: "lead_confirmation",
            data: { name: lead.name, college: collegeName },
        });
    }
    async sendStatusUpdateSms(lead) {
        const collegeName = this.getCollegeName(lead);
        const statusLabel = lead.status.replace("_", " ");
        await sms_service_1.default.send({
            to: lead.phone,
            template: "lead_status_update",
            data: { name: lead.name, college: collegeName, status: statusLabel },
        });
    }
}
exports.default = new LeadService();
//# sourceMappingURL=lead.service.js.map