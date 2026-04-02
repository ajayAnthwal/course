import axios from "axios";
import { config } from "../config";

interface WhatsAppMessage {
  to: string;
  message: string;
  template?: string;
  variables?: Record<string, string>;
}

class WhatsAppService {
  private apiUrl: string;
  private apiKey: string;
  private fromNumber: string;

  constructor() {
    this.apiUrl = config.whatsapp.apiUrl || "https://api.whatsapp.business";
    this.apiKey = config.whatsapp.apiKey || "";
    this.fromNumber = config.whatsapp.fromNumber || "";
  }

  async sendMessage({ to, message, template, variables }: WhatsAppMessage) {
    try {
      if (template) {
        return await this.sendTemplateMessage({ to, template, variables });
      }
      
      return await this.sendTextMessage(to, message);
    } catch (error) {
      console.error("WhatsApp send error:", error);
      throw error;
    }
  }

  private async sendTextMessage(to: string, message: string) {
    const payload = {
      messaging_product: "whatsapp",
      to: this.formatPhoneNumber(to),
      type: "text",
      text: { body: message },
    };

    return this.makeRequest(payload);
  }

  private async sendTemplateMessage({ to, template, variables }: WhatsAppMessage & { template: string }) {
    let body = template;
    if (variables) {
      Object.entries(variables).forEach(([key, value]) => {
        body = body.replace(new RegExp(`{{${key}}}`, "g"), value);
      });
    }

    const payload = {
      messaging_product: "whatsapp",
      to: this.formatPhoneNumber(to),
      type: "template",
      template: {
        name: template,
        language: { code: "en_US" },
        components: variables ? [
          {
            type: "body",
            parameters: Object.values(variables).map((v) => ({ type: "text", text: v })),
          },
        ] : [],
      },
    };

    return this.makeRequest(payload);
  }

  private async makeRequest(payload: object) {
    const url = `${this.apiUrl}/v17.0/${config.whatsapp.phoneNumberId}/messages`;
    
    const response = await axios.post(url, payload, {
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  }

  private formatPhoneNumber(phone: string): string {
    const cleaned = phone.replace(/\D/g, "");
    if (cleaned.startsWith("91") && cleaned.length > 10) {
      return cleaned;
    }
    if (cleaned.length === 10) {
      return `91${cleaned}`;
    }
    return cleaned;
  }

  async sendOTP(phone: string, otp: string) {
    return this.sendMessage({
      to: phone,
      template: "eduportal_otp",
      variables: { otp },
    });
  }

  async sendAdmissionUpdate(phone: string, collegeName: string, status: string) {
    return this.sendMessage({
      to: phone,
      message: `Your application status for ${collegeName} has been updated to: ${status}. Check your dashboard for details.`,
    });
  }

  async sendReminder(phone: string, message: string) {
    return this.sendMessage({
      to: phone,
      message,
    });
  }
}

export const whatsappService = new WhatsAppService();
export default whatsappService;