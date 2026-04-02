import { SmsProvider, SendSmsOptions, SendSmsResult } from "./types";
export declare class TwilioProvider implements SmsProvider {
    readonly name = "twilio";
    private accountSid;
    private authToken;
    private fromNumber;
    constructor(accountSid: string, authToken: string, fromNumber: string);
    send(options: SendSmsOptions): Promise<SendSmsResult>;
}
//# sourceMappingURL=twilio.d.ts.map