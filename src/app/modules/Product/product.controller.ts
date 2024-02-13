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

export const ProductControllers = {
    addProduct,
};
