import express from "express";
import { getApplications, getApplicationById, createApplication, updateApplication, updatePayment, cancelApplication, getApplicationStats } from "../controller/application.controller";
import { authenticate } from "../../../middlewares/auth";

const router = express.Router();

router.use(authenticate);

router.get("/stats", getApplicationStats);
router.get("/", getApplications);
router.get("/:id", getApplicationById);
router.post("/", createApplication);
router.patch("/:id", updateApplication);
router.patch("/:id/payment", updatePayment);
router.delete("/:id", cancelApplication);

export default router;