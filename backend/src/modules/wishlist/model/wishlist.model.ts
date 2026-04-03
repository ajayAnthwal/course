import mongoose, { Schema, Document } from "mongoose";

export interface IWishlist extends Document {
  user: mongoose.Types.ObjectId;
  college: mongoose.Types.ObjectId;
  notes?: string;
  createdAt: Date;
}

const WishlistSchema = new Schema<IWishlist>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    college: { type: Schema.Types.ObjectId, ref: "College", required: true },
    notes: { type: String },
  },
  { timestamps: true }
);

WishlistSchema.index({ user: 1, college: 1 }, { unique: true });
WishlistSchema.index({ user: 1, createdAt: -1 });

export default mongoose.model<IWishlist>("Wishlist", WishlistSchema);