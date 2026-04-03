import { Router } from "express";
import * as documentController from "../controller/document.controller";
import { protect, restrictTo } from "../../../middlewares/auth";
import { validate } from "../../../middlewares/validate";
import upload from "../../../middlewares/upload";

const router = Router();

router.get("/stats", documentController.getDocumentStats);
router.get("/", documentController.getAllDocuments);
router.get("/:id", documentController.getDocumentById);

router.use(protect);

router.post("/", upload.single("file"), documentController.createDocument);

router.use(restrictTo("admin"));

router.patch("/:id/verify", documentController.verifyDocument);
router.patch("/:id", upload.single("file"), documentController.updateDocument);
router.delete("/:id", documentController.deleteDocument);

export default router;