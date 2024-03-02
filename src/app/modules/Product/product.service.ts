import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { User } from "../User/user.model";
import { TProduct } from "./product.interface";
import { Product } from "./product.model";
import { USER_ROLE } from "../User/user.constant";

const addProductIntoDB = async (userId: string, productInfo: TProduct) => {
    const user = await User.findById(userId);

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "This user not found.");
    }

    if (user && user.role !== USER_ROLE.seller) {
        throw new AppError(
            httpStatus.BAD_REQUEST,
            "You are not a sellter. Only seller can add a product.",
        );
    }

    productInfo.userId = user?._id;

    const result = await Product.create(productInfo);

    return result;
};

const getAllProductsFromDB = async () => {
    const result = await Product.find({}).sort({ createdAt: -1 });

    return result;
};

const getAProductByIdFromDB = async (productId: string) => {
    const product = await Product.findById(productId);

    return product;
};

const updateAProductByIdIntoDB = async (
    userId: string,
    productId: string,
    productData: Partial<TProduct>,
) => {
    const user = await User.findById(userId);

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "This user not found.");
    }

    if (user && user.role !== USER_ROLE.seller) {
        throw new AppError(
            httpStatus.BAD_REQUEST,
            "You are not a sellter. Only seller can update product information.",
        );
    }

    const product = await Product.findById(productId);

    if (product?.userId !== user?._id) {
        throw new AppError(
            httpStatus.BAD_REQUEST,
            "You are not owner of this product. Only owner can update product information.",
        );
    }

    const result = Product.findByIdAndUpdate(productId, productData);

    return result;
};

const deleteAProductByIdFromDB = async (productId: string) => {
    const result = Product.findByIdAndDelete(productId);

    return result;
};

const bulkProductDeleteFromDB = async (productIds: string[]) => {
    const result = await Product.deleteMany({
        _id: { $in: productIds },
    });

    return result;
};

export const ProductServices = {
    addProductIntoDB,
    getAllProductsFromDB,
    getAProductByIdFromDB,
    updateAProductByIdIntoDB,
    deleteAProductByIdFromDB,
    bulkProductDeleteFromDB,
};
