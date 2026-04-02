"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Msg91Provider = void 0;
class Msg91Provider {
    constructor(apiKey, senderId, templateId) {
        this.name = "msg91";
        this.apiKey = apiKey;
        this.senderId = senderId;
        this.templateId = templateId;
    }
    async send(options) {
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
exports.Msg91Provider = Msg91Provider;
//# sourceMappingURL=msg91.js.map