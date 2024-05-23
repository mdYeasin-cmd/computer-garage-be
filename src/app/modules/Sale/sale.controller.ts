import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { SaleServices } from "./sale.service";

const addASaleInfo = catchAsync(async (req, res) => {
    const user = req.user;
    const saleInfo = req.body;

    switch (user.role) {
        case "seller":
            saleInfo.sellerId = user._id;
            break;

        case "buyer":
            saleInfo.buyerId = user._id;
            break;

        default:
            break;
    }

    const result = await SaleServices.addASaleInfoIntoDB(saleInfo);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "A sale information is added successfully",
        data: result,
    });
});

const getSalesHistory = catchAsync(async (req, res) => {
    const userId = req.user._id;

    const result = await SaleServices.getSalesHistoryFromDB(userId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Sales information are retrieved successfully",
        data: result,
    });
});

const getPurchasesHistory = catchAsync(async (req, res) => {
    const userId = req.user._id;

    const result = await SaleServices.getPurchasesHistoryFromDB(userId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Purchases information are retrieved successfully",
        data: result,
    });
});

export const SaleControllers = {
    addASaleInfo,
    getSalesHistory,
    getPurchasesHistory,
};
