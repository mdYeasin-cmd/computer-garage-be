import { ObjectId } from "mongoose";

export type TSale = {
    sellerId: ObjectId;
    buyerId: ObjectId;
    productId: ObjectId;
    productName: string;
    quantity: number;
    buyerName: string;
    dateOfSale: string;
};
