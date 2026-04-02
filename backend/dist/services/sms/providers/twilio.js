"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TwilioProvider = void 0;
class TwilioProvider {
    constructor(accountSid, authToken, fromNumber) {
        this.name = "twilio";
        this.accountSid = accountSid;
        this.authToken = authToken;
        this.fromNumber = fromNumber;
    }
    async send(options) {
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
exports.TwilioProvider = TwilioProvider;
//# sourceMappingURL=twilio.js.map