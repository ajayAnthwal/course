import express from "express";
import { getWishlist, addToWishlist, removeFromWishlist, checkWishlist, updateWishlistNotes, getWishlistStats } from "../controller/wishlist.controller";
import { authenticate } from "../../../middlewares/auth";

const router = express.Router();

router.use(authenticate);

router.get("/stats", getWishlistStats);
router.get("/check", checkWishlist);
router.get("/", getWishlist);
router.post("/", addToWishlist);
router.patch("/:collegeId", updateWishlistNotes);
router.delete("/:collegeId", removeFromWishlist);

export default router;