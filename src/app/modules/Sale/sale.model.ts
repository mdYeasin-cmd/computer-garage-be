import { Schema, model } from "mongoose";
import { TSale } from "./sale.interface";

const saleSchema = new Schema<TSale>({
    productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
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
});

export const Sale = model<TSale>("Sale", saleSchema);
