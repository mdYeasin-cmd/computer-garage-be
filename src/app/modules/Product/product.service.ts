import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { User } from "../User/user.model";
import { TProduct } from "./product.interface";
import { Product } from "./product.model";
import { USER_ROLE } from "../User/user.constant";
import { SortOrder } from "mongoose";

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

    const filters: Record<string, unknown> = {};

    if (user?.role === USER_ROLE.seller) {
        filters.userId = user?._id;
    }

    if (query.category) {
        filters.category = query.category;
    }

    if (query.brand) {
        filters.brand = query.brand;
    }

    if (query.compatibility) {
        filters.compatibility = query.compatibility;
    }

    if (query?.minPrice && !query?.maxPrice) {
        filters.price = { $gte: query.minPrice };
    }

    if (!query?.minPrice && query?.maxPrice) {
        filters.price = { $lte: query.maxPrice };
    }

    if (query?.minPrice && query?.maxPrice) {
        const minPrice = Number(query.minPrice);
        const maxPrice = Number(query.maxPrice);
        filters.price = {
            $gte: minPrice,
            $lte: maxPrice,
        };
    }

    if (query.interface) {
        filters.interface = query.interface;
    }

    if (query.condition) {
        filters.condition = query.condition;
    }

    if (query.capacity) {
        filters.capacity = query.capacity;
    }

    if (query.color) {
        filters.color = query.color;
    }

    let sortBy: string = "createdAt";
    let sortOrder: SortOrder = "desc";

    if (query?.sortBy) {
        sortBy = query.sortBy as string;
    }

    if (query?.sortOrder) {
        sortOrder = query?.sortOrder === "asc" ? 1 : -1;
    }

    const sortByFields = sortBy.split(",");

    const sortObject: Record<string, SortOrder> = {};

    sortByFields.forEach((field) => {
        sortObject[field] = sortOrder;
    });

    let limit: number = 10;
    let page: number = 1;
    let skip: number = 0;

    if (query?.limit) {
        limit = Number(query.limit);
    }

    if (query?.page) {
        page = Number(query.page);
        skip = (page - 1) * limit;
    }

    const result = await Product.find(filters)
        .populate("userId")
        .sort(sortObject)
        .skip(skip)
        .limit(limit);

    const total = await Product.countDocuments(filters);
    const totalPage = Math.ceil(total / limit);

    const meta = {
        page,
        limit,
        total,
        totalPage,
    };

    return {
        meta,
        result,
    };
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
