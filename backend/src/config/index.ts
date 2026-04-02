import dotenv from "dotenv";
import path from "path";

// Load .env from project root (two levels up from src/config/)
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

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
  whatsapp: {
    apiUrl: process.env.WHATSAPP_API_URL || "https://api.whatsapp.business",
    apiKey: process.env.WHATSAPP_API_KEY || "",
    phoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID || "",
    fromNumber: process.env.WHATSAPP_FROM_NUMBER || "",
  },
} as const;

export default config;
