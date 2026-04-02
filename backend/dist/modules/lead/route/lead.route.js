"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const leadController = __importStar(require("../controller/lead.controller"));
const auth_1 = require("../../../middlewares/auth");
const validate_1 = require("../../../middlewares/validate");
const lead_validation_1 = require("../validation/lead.validation");
const router = (0, express_1.Router)();
router.use(auth_1.protect);
router.get("/stats", (0, auth_1.restrictTo)("admin", "college"), leadController.getLeadStats);
router.get("/", (0, validate_1.validate)(lead_validation_1.getLeadsQuerySchema), leadController.getAllLeads);
router.get("/:id", leadController.getLeadById);
router.post("/", (0, validate_1.validate)(lead_validation_1.createLeadSchema), leadController.createLead);
router.patch("/:id", (0, auth_1.restrictTo)("admin", "college"), (0, validate_1.validate)(lead_validation_1.updateLeadSchema), leadController.updateLead);
router.delete("/:id", (0, auth_1.restrictTo)("admin"), leadController.deleteLead);
exports.default = router;
//# sourceMappingURL=lead.route.js.map