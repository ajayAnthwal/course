import config from "../../config";
import { SmsProvider, SendSmsResult } from "./providers/types";
import { Fast2SmsProvider } from "./providers/fast2sms";
import { TwilioProvider } from "./providers/twilio";
import { Msg91Provider } from "./providers/msg91";

export interface SendSmsParams {
  to: string;
  template: SmsTemplateKey;
  data: Record<string, string>;
}

export type SmsTemplateKey =
  | "lead_confirmation"
  | "lead_status_update"
  | "college_assigned";

const TEMPLATES: Record<SmsTemplateKey, string> = {
  lead_confirmation:
    "Hi {{name}}, your enquiry for {{college}} has been received. We will contact you shortly. - EduPortal",
  lead_status_update:
    "Hi {{name}}, your enquiry for {{college}} is now: {{status}}. Login to view details. - EduPortal",
  college_assigned:
    "New lead: {{name}} has enquired about {{college}} ({{course}}). Contact: {{phone}} - EduPortal",
};

class SmsService {
  private provider: SmsProvider | null = null;

  private getProvider(): SmsProvider | null {
    if (this.provider) return this.provider;

    const providerName = config.sms.provider;

    switch (providerName) {
      case "fast2sms":
        if (!config.sms.fast2smsApiKey) return null;
        this.provider = new Fast2SmsProvider(config.sms.fast2smsApiKey);
        break;

      case "twilio":
        if (!config.sms.twilioAccountSid || !config.sms.twilioAuthToken || !config.sms.twilioFromNumber) {
          return null;
        }
        this.provider = new TwilioProvider(
          config.sms.twilioAccountSid,
          config.sms.twilioAuthToken,
          config.sms.twilioFromNumber
        );
        break;

      case "msg91":
        if (!config.sms.msg91ApiKey || !config.sms.msg91SenderId) return null;
        this.provider = new Msg91Provider(
          config.sms.msg91ApiKey,
          config.sms.msg91SenderId,
          config.sms.msg91TemplateId || ""
        );
        break;

      default:
        return null;
    }

    return this.provider;
  }

  private renderTemplate(template: SmsTemplateKey, data: Record<string, string>): string {
    let message = TEMPLATES[template];
    for (const [key, value] of Object.entries(data)) {
      message = message.replace(new RegExp(`\\{\\{${key}\\}\\}`, "g"), value || "");
    }
    return message;
  }

  async send(params: SendSmsParams): Promise<SendSmsResult> {
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
    } catch (error: any) {
      console.error(`[SMS] Failed via ${provider.name}:`, error.message);
      return {
        success: false,
        provider: provider.name,
        error: error.message,
      };
    }
  }

  async sendRaw(to: string, message: string): Promise<SendSmsResult> {
    const provider = this.getProvider();

    if (!provider) {
      return { success: false, provider: "none", error: "No SMS provider configured" };
    }

    try {
      return await provider.send({ to, message });
    } catch (error: any) {
      return { success: false, provider: provider.name, error: error.message };
    }
  }

  async sendOTP(to: string, otp: string): Promise<SendSmsResult> {
    const message = `Your EduPortal verification code is ${otp}. This code expires in 10 minutes.`;
    return this.sendRaw(to, message);
  }
}

export default new SmsService();
