import { SmsProvider, SendSmsOptions, SendSmsResult } from "./types";

export class TwilioProvider implements SmsProvider {
  readonly name = "twilio";
  private accountSid: string;
  private authToken: string;
  private fromNumber: string;

  constructor(accountSid: string, authToken: string, fromNumber: string) {
    this.accountSid = accountSid;
    this.authToken = authToken;
    this.fromNumber = fromNumber;
  }

  async send(options: SendSmsOptions): Promise<SendSmsResult> {
    // In production, call Twilio API:
    // const twilio = require("twilio")(this.accountSid, this.authToken);
    // const message = await twilio.messages.create({
    //   body: options.message,
    //   from: this.fromNumber,
    //   to: options.to,
    // });

    console.log(`[Twilio] Sending from ${this.fromNumber} to ${options.to}: ${options.message.slice(0, 50)}...`);

    return {
      success: true,
      provider: this.name,
      messageId: `tw_${Date.now()}`,
    };
  }
}
