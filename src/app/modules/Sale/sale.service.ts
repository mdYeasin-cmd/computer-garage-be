import mongoose, { ObjectId } from "mongoose";
import { TSale } from "./sale.interface";
import { Sale } from "./sale.model";
import { Product } from "../Product/product.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const addASaleInfoIntoDB = async (sellerId: ObjectId, saleData: TSale) => {
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        if (saleData.quantity <= 0) {
            throw new AppError(
                httpStatus.BAD_REQUEST,
                "Product quantity can't be 0 (zero) or (-) minus value",
            );
        }

        const product = await Product.findById(saleData.productId);

        if (!product) {
            throw new AppError(httpStatus.NOT_FOUND, "Product not found!");
        }

        if (saleData.quantity > product.quantity) {
            throw new AppError(
                httpStatus.BAD_REQUEST,
                "Your selling request is out of your stocked product!",
            );
        }

        const productUpdateInfo: {
            quantity?: number;
            availability?: "Out of stock";
        } = {};

        if (saleData.quantity <= product.quantity) {
            productUpdateInfo.quantity = product.quantity - saleData.quantity;
        }

        if (productUpdateInfo.quantity === 0) {
            productUpdateInfo.availability = "Out of stock";
        }

        await Product.updateOne({ _id: product._id }, productUpdateInfo, {
            session,
        });

        saleData.sellerId = sellerId;

        const result = await Sale.create([saleData], { session });

        await session.commitTransaction();
        await session.endSession();

        return result;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error(error);
    }
};

const getSalesHistoryFromDB = async (userId: string) => {
    const result = await Sale.find({ sellerId: userId });

    return result;
};

export const SaleServices = {
    addASaleInfoIntoDB,
    getSalesHistoryFromDB,
};
