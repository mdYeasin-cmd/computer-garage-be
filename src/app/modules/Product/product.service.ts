import { TProduct } from "./product.interface";
import { Product } from "./product.model";

const addProductIntoDB = async (productInfo: TProduct) => {
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
    productId: string,
    productData: Partial<TProduct>,
) => {
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
