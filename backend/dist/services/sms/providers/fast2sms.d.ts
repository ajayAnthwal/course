import { SmsProvider, SendSmsOptions, SendSmsResult } from "./types";
export declare class Fast2SmsProvider implements SmsProvider {
    readonly name = "fast2sms";
    private apiKey;
    constructor(apiKey: string);
    send(options: SendSmsOptions): Promise<SendSmsResult>;
}
//# sourceMappingURL=fast2sms.d.ts.map