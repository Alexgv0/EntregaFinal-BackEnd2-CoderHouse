import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
    {
        products: {
            type: [
                {
                    _id: false,
                    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
                    quantity: { type: Number, required: true, min: 1 },
                },
            ],
            required: true,
        },
    },
    {
        versionKey: false,
    }
);

export const Cart = mongoose.model("Cart", cartSchema);
