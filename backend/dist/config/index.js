"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
// Load .env from project root (two levels up from src/config/)
dotenv_1.default.config({ path: path_1.default.resolve(process.cwd(), ".env") });
const config = {
    port: parseInt(process.env.PORT || "5000", 10),
    mongodbUri: process.env.MONGODB_URI || "mongodb://localhost:27017/education-portal",
    jwt: {
        secret: process.env.JWT_SECRET || "default-secret-change-me",
        expiresIn: process.env.JWT_EXPIRES_IN || "7d",
        cookieExpiresIn: parseInt(process.env.JWT_COOKIE_EXPIRES_IN || "7", 10),
    },
    nodeEnv: process.env.NODE_ENV || "development",
    frontendUrl: process.env.FRONTEND_URL || "http://localhost:3000",
    razorpay: {
        keyId: process.env.RAZORPAY_KEY_ID || "",
        keySecret: process.env.RAZORPAY_KEY_SECRET || "",
        webhookSecret: process.env.RAZORPAY_WEBHOOK_SECRET || "",
    },
    sms: {
        provider: process.env.SMS_PROVIDER || "",
        fast2smsApiKey: process.env.FAST2SMS_API_KEY || "",
        twilioAccountSid: process.env.TWILIO_ACCOUNT_SID || "",
        twilioAuthToken: process.env.TWILIO_AUTH_TOKEN || "",
        twilioFromNumber: process.env.TWILIO_FROM_NUMBER || "",
        msg91ApiKey: process.env.MSG91_API_KEY || "",
        msg91SenderId: process.env.MSG91_SENDER_ID || "",
        msg91TemplateId: process.env.MSG91_TEMPLATE_ID || "",
    },
};
exports.default = config;
//# sourceMappingURL=index.js.map