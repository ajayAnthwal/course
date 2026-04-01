import { SmsProvider, SendSmsOptions, SendSmsResult } from "./types";

export class Msg91Provider implements SmsProvider {
  readonly name = "msg91";
  private apiKey: string;
  private senderId: string;
  private templateId: string;

  constructor(apiKey: string, senderId: string, templateId: string) {
    this.apiKey = apiKey;
    this.senderId = senderId;
    this.templateId = templateId;
  }

  async send(options: SendSmsOptions): Promise<SendSmsResult> {
    // In production, call MSG91 API:
    // const response = await fetch("https://api.msg91.com/api/v5/flow/", {
    //   method: "POST",
    //   headers: {
    //     authkey: this.apiKey,
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     flow_id: this.templateId,
    //     sender: this.senderId,
    //     mobiles: options.to,
    //     VAR1: options.message,
    //   }),
    // });

    console.log(`[MSG91] Sending to ${options.to}: ${options.message.slice(0, 50)}...`);

    return {
      success: true,
      provider: this.name,
      messageId: `msg_${Date.now()}`,
    };
  }
}
