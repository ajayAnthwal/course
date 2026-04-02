"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const appError_1 = __importDefault(require("../utils/appError"));
const validate = (schema) => {
    return (req, _res, next) => {
        const result = schema.safeParse({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        if (!result.success) {
            const errors = result.error.errors.map((e) => ({
                path: e.path.join("."),
                message: e.message,
            }));
            return next(new appError_1.default(JSON.stringify(errors), 400));
        }
        next();
    };
};
exports.validate = validate;
//# sourceMappingURL=validate.js.map