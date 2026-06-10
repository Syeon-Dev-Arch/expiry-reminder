import mongoose, { Schema } from "mongoose";

const productsSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter the name of the product"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Please enter the category of the product"],
      enum: ["medicine", "food", "bills", "subscriptions", "others"],
      trim: true,
    },
    expiryDate: {
      type: Date,
      required: [true, "Please enter the expiry date of the product"],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    reminderDays: {
      type: Number,
      default: 7,
    },
    reminderSent: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export const Product =
  mongoose.models.Product || mongoose.model("Product", productsSchema);
