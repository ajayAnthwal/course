import { Router } from "express";
import * as categoryController from "../controller/category.controller";
import { protect, restrictTo } from "../../../middlewares/auth";
import { validate } from "../../../middlewares/validate";
import upload from "../../../middlewares/upload";
import { createCategorySchema, updateCategorySchema, getCategoriesQuerySchema } from "../validation/category.validation";

const router = Router();

router.get("/", validate(getCategoriesQuerySchema), categoryController.getAllCategories);
router.get("/:id", categoryController.getCategoryById);

router.use(protect);
router.post("/", restrictTo("admin"), upload.single("image"), validate(createCategorySchema), categoryController.createCategory);
router.patch("/:id", restrictTo("admin"), upload.single("image"), validate(updateCategorySchema), categoryController.updateCategory);
router.delete("/:id", restrictTo("admin"), categoryController.deleteCategory);

export default router;
