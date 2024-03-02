import { ObjectId } from "mongoose";

export type TProduct = {
    name: string;
    category: string;
    brand: string;
    price: number;
    quantity: number;
    availability: "In stock" | "Out of stock";
    warrantyPeriod: number;
    compatibility: string;
    interface: string;
    color?: string;
    capacity: string;
    condition: string;
    description: string;
    userId: ObjectId;
};
