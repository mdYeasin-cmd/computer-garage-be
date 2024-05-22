import { ObjectId } from "mongoose";

export type TSale = {
    sellerId: ObjectId;
    productId: ObjectId;
    productName: string;
    quantity: number;
    buyerName: string;
    dateOfSale: string;
};
