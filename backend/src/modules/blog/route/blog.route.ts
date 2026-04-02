import { Router } from "express";
import * as blogController from "../controller/blog.controller";
import { protect, restrictTo } from "../../../middlewares/auth";
import { validate } from "../../../middlewares/validate";
import upload from "../../../middlewares/upload";
import { createBlogSchema, updateBlogSchema, getBlogsQuerySchema } from "../validation/blog.validation";

const router = Router();

router.get("/featured", blogController.getFeaturedBlogs);
router.get("/latest", blogController.getLatestBlogs);
router.get("/slug/:slug", blogController.getBlogBySlug);
router.get("/", validate(getBlogsQuerySchema), blogController.getAllBlogs);
router.get("/:id", blogController.getBlogById);

router.use(protect);
router.post("/", restrictTo("admin"), upload.single("image"), validate(createBlogSchema), blogController.createBlog);
router.patch("/:id", restrictTo("admin"), upload.single("image"), validate(updateBlogSchema), blogController.updateBlog);
router.delete("/:id", restrictTo("admin"), blogController.deleteBlog);

export default router;
