import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ProductServices } from "./product.service";

const addProduct = catchAsync(async (req, res) => {
    const productInfo = req.body;

    const result = await ProductServices.addProductIntoDB(productInfo);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Product is added successfully",
        data: result,
    });
});

const getAllProducts = catchAsync(async (req, res) => {
    const result = await ProductServices.getAllProductsFromDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Products are retrieved successfully",
        data: result,
    });
});

const getAProductById = catchAsync(async (req, res) => {
    const productId = req.params.id;

    const result = await ProductServices.getAProductByIdFromDB(productId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Products is retrieved successfully",
        data: result,
    });
});

export const ProductControllers = {
    addProduct,
    getAllProducts,
    getAProductById,
};
