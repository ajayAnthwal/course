import { SmsProvider, SendSmsOptions, SendSmsResult } from "./types";
export declare class Msg91Provider implements SmsProvider {
    readonly name = "msg91";
    private apiKey;
    private senderId;
    private templateId;
    constructor(apiKey: string, senderId: string, templateId: string);
    send(options: SendSmsOptions): Promise<SendSmsResult>;
}
//# sourceMappingURL=msg91.d.ts.map