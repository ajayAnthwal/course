"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../../config"));
const fast2sms_1 = require("./providers/fast2sms");
const twilio_1 = require("./providers/twilio");
const msg91_1 = require("./providers/msg91");
const TEMPLATES = {
    lead_confirmation: "Hi {{name}}, your enquiry for {{college}} has been received. We will contact you shortly. - EduPortal",
    lead_status_update: "Hi {{name}}, your enquiry for {{college}} is now: {{status}}. Login to view details. - EduPortal",
    college_assigned: "New lead: {{name}} has enquired about {{college}} ({{course}}). Contact: {{phone}} - EduPortal",
};
class SmsService {
    constructor() {
        this.provider = null;
    }
    getProvider() {
        if (this.provider)
            return this.provider;
        const providerName = config_1.default.sms.provider;
        switch (providerName) {
            case "fast2sms":
                if (!config_1.default.sms.fast2smsApiKey)
                    return null;
                this.provider = new fast2sms_1.Fast2SmsProvider(config_1.default.sms.fast2smsApiKey);
                break;
            case "twilio":
                if (!config_1.default.sms.twilioAccountSid || !config_1.default.sms.twilioAuthToken || !config_1.default.sms.twilioFromNumber) {
                    return null;
                }
                this.provider = new twilio_1.TwilioProvider(config_1.default.sms.twilioAccountSid, config_1.default.sms.twilioAuthToken, config_1.default.sms.twilioFromNumber);
                break;
            case "msg91":
                if (!config_1.default.sms.msg91ApiKey || !config_1.default.sms.msg91SenderId)
                    return null;
                this.provider = new msg91_1.Msg91Provider(config_1.default.sms.msg91ApiKey, config_1.default.sms.msg91SenderId, config_1.default.sms.msg91TemplateId || "");
                break;
            default:
                return null;
        }
        return this.provider;
    }
    renderTemplate(template, data) {
        let message = TEMPLATES[template];
        for (const [key, value] of Object.entries(data)) {
            message = message.replace(new RegExp(`\\{\\{${key}\\}\\}`, "g"), value || "");
        }
        return message;
    }
    async send(params) {
        const provider = this.getProvider();
        if (!provider) {
            console.log("[SMS] No provider configured, skipping send");
            return {
                success: false,
                provider: "none",
                error: "No SMS provider configured",
            };
        }
        const message = this.renderTemplate(params.template, params.data);
        try {
            const result = await provider.send({ to: params.to, message });
            return result;
        }
        catch (error) {
            console.error(`[SMS] Failed via ${provider.name}:`, error.message);
            return {
                success: false,
                provider: provider.name,
                error: error.message,
            };
        }
    }
    async sendRaw(to, message) {
        const provider = this.getProvider();
        if (!provider) {
            return { success: false, provider: "none", error: "No SMS provider configured" };
        }
        try {
            return await provider.send({ to, message });
        }
        catch (error) {
            return { success: false, provider: provider.name, error: error.message };
        }
    }
}
exports.default = new SmsService();
//# sourceMappingURL=sms.service.js.map