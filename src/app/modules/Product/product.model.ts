import { Schema, model } from "mongoose";
import { TProduct } from "./product.interface";

const productSchema = new Schema<TProduct>({
    category: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    compatibility: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    interface: {
        type: String,
        required: true,
    },
    condition: {
        type: String,
        required: true,
    },
    capacity: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    warrantyPeriod: {
        type: Number,
        required: true,
    },
    color: {
        type: String,
    },
    availability: {
        type: String,
        enum: ["in stock", "out of stock"],
        required: true,
    },
});

export const Product = model<TProduct>("Product", productSchema);
