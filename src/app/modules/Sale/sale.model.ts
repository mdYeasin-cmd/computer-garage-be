import { Schema, model } from "mongoose";
import { TSale } from "./sale.interface";

const saleSchema = new Schema<TSale>(
    {
        sellerId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        buyerId: {
            type: Schema.Types.ObjectId,
        },
        productId: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        productName: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        buyerName: {
            type: String,
            required: true,
        },
        dateOfSale: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

export const Sale = model<TSale>("Sale", saleSchema);
