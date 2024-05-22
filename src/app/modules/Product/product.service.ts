import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { User } from "../User/user.model";
import { TProduct } from "./product.interface";
import { Product } from "./product.model";
import { USER_ROLE } from "../User/user.constant";
import QueryBuilder from "../../builder/QueryBuilder";
import { productSearchableFields } from "./product.constant";

const addProductIntoDB = async (userId: string, productInfo: TProduct) => {
    const user = await User.findById(userId);

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "This user not found.");
    }

    productInfo.userId = user?._id;

    const result = await Product.create(productInfo);

    return result;
};

const getAllProductsFromDB = async (
    userId: string,
    query: Record<string, unknown>,
) => {
    const user = await User.findById(userId);

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "This user not found.");
    }

    if (user.role === USER_ROLE.seller) {
        query.userId = user._id;
    }

    const productQuery = new QueryBuilder(Product.find(), query)
        .search(productSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();

    const result = await productQuery.modelQuery;

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

    const product = await Product.findById(productId);

    if (String(user?._id) !== String(product?.userId)) {
        throw new AppError(
            httpStatus.BAD_REQUEST,
            "You are not owner of this product. Only owner can update product information.",
        );
    }

    const result = Product.findByIdAndUpdate(product?._id, productData, {
        new: true,
    });

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
