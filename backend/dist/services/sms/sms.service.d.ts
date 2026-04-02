import { SendSmsResult } from "./providers/types";
export interface SendSmsParams {
    to: string;
    template: SmsTemplateKey;
    data: Record<string, string>;
}
export type SmsTemplateKey = "lead_confirmation" | "lead_status_update" | "college_assigned";
declare class SmsService {
    private provider;
    private getProvider;
    private renderTemplate;
    send(params: SendSmsParams): Promise<SendSmsResult>;
    sendRaw(to: string, message: string): Promise<SendSmsResult>;
}
declare const _default: SmsService;
export default _default;
//# sourceMappingURL=sms.service.d.ts.map