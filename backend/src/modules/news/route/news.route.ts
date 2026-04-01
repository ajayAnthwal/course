import { Router } from "express";
import * as newsController from "../controller/news.controller";
import { protect, restrictTo } from "../../../middlewares/auth";
import { validate } from "../../../middlewares/validate";
import { createNewsSchema, updateNewsSchema, getNewsQuerySchema } from "../validation/news.validation";

const router = Router();

router.get("/featured", newsController.getFeaturedNews);
router.get("/latest", newsController.getLatestNews);
router.get("/slug/:slug", newsController.getNewsBySlug);
router.get("/", validate(getNewsQuerySchema), newsController.getAllNews);
router.get("/:id", newsController.getNewsById);

router.use(protect);
router.post("/", restrictTo("admin"), validate(createNewsSchema), newsController.createNews);
router.patch("/:id", restrictTo("admin"), validate(updateNewsSchema), newsController.updateNews);
router.delete("/:id", restrictTo("admin"), newsController.deleteNews);

export default router;
