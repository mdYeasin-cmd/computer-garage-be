import { TProduct } from "./product.interface";
import { Product } from "./product.model";

const addProductIntoDB = async (productInfo: TProduct) => {
    const result = await Product.create(productInfo);

    return result;
};

const getAllProductsFromDB = async () => {
    const result = await Product.find({});

    return result;
};

const getAProductByIdFromDB = async (productId: string) => {
    const product = await Product.findById(productId);

    return product;
};

export const ProductServices = {
    addProductIntoDB,
    getAllProductsFromDB,
    getAProductByIdFromDB,
};
