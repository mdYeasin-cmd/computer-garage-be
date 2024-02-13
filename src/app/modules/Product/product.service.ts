import { TProduct } from "./product.interface";
import { Product } from "./product.model";

const addProductIntoDB = async (productInfo: TProduct) => {
    const result = await Product.create(productInfo);

    return result;
};

export const ProductServices = {
    addProductIntoDB,
};
