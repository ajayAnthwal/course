import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

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
} as const;

export default config;
