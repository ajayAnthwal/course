export interface SendSmsOptions {
    to: string;
    message: string;
}
export interface SendSmsResult {
    success: boolean;
    provider: string;
    messageId?: string;
    error?: string;
}
export interface SmsProvider {
    readonly name: string;
    send(options: SendSmsOptions): Promise<SendSmsResult>;
}
//# sourceMappingURL=types.d.ts.map