import { ObjectId } from "mongoose";

export type TSale = {
    productId: ObjectId;
    quantity: number;
    buyerName: string;
    dateOfSale: string;
};
