import { ObjectId } from "mongoose";

export type TSale = {
    productId: ObjectId;
    productName: string;
    quantity: number;
    buyerName: string;
    dateOfSale: string;
};
