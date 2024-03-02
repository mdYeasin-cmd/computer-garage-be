import { Schema, model } from "mongoose";
import { TProduct } from "./product.interface";

const productSchema = new Schema<TProduct>(
    {
        name: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        brand: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        availability: {
            type: String,
            enum: ["in stock", "out of stock"],
            required: true,
        },
        warrantyPeriod: {
            type: Number,
        },
        compatibility: {
            type: String,
        },
        interface: {
            type: String,
        },
        color: {
            type: String,
        },
        capacity: {
            type: String,
        },
        condition: {
            type: String,
        },
        description: {
            type: String,
        },
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

export const Product = model<TProduct>("Product", productSchema);
