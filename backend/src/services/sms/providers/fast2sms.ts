import { SmsProvider, SendSmsOptions, SendSmsResult } from "./types";

export class Fast2SmsProvider implements SmsProvider {
  readonly name = "fast2sms";
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async send(options: SendSmsOptions): Promise<SendSmsResult> {
    // In production, call Fast2SMS API:
    // const response = await fetch("https://www.fast2sms.com/dev/bulkV2", {
    //   method: "POST",
    //   headers: {
    //     authorization: this.apiKey,
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     route: "q",
    //     message: options.message,
    //     language: "english",
    //     flash: 0,
    //     numbers: options.to,
    //   }),
    // });
    // const data = await response.json();

    console.log(`[Fast2SMS] Sending to ${options.to}: ${options.message.slice(0, 50)}...`);

    return {
      success: true,
      provider: this.name,
      messageId: `f2s_${Date.now()}`,
    };
  }
}
