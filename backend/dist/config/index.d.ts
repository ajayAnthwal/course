declare const config: {
    readonly port: number;
    readonly mongodbUri: string;
    readonly jwt: {
        readonly secret: string;
        readonly expiresIn: string;
        readonly cookieExpiresIn: number;
    };
    readonly nodeEnv: string;
    readonly frontendUrl: string;
    readonly razorpay: {
        readonly keyId: string;
        readonly keySecret: string;
        readonly webhookSecret: string;
    };
    readonly sms: {
        readonly provider: string;
        readonly fast2smsApiKey: string;
        readonly twilioAccountSid: string;
        readonly twilioAuthToken: string;
        readonly twilioFromNumber: string;
        readonly msg91ApiKey: string;
        readonly msg91SenderId: string;
        readonly msg91TemplateId: string;
    };
};
export default config;
//# sourceMappingURL=index.d.ts.map