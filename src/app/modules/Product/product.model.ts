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
        compatibility: {
            type: String,
        },
        interface: {
            type: String,
        },
        condition: {
            type: String,
        },
        capacity: {
            type: String,
        },

        warrantyPeriod: {
            type: Number,
        },
        color: {
            type: String,
        },
        description: {
            type: String,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

export const Product = model<TProduct>("Product", productSchema);
