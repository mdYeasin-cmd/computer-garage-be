import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { SaleServices } from "./sale.service";

const addASaleInfo = catchAsync(async (req, res) => {
    const saleInfo = req.body;

    const result = await SaleServices.addASaleInfoIntoDB(saleInfo);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "A sale information is added successfully",
        data: result,
    });
});

const getSalesHistory = catchAsync(async (req, res) => {
    const userId = req.user;

    console.log(userId, "user id");

    const result = await SaleServices.getSalesHistoryFromDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Sales information are retrieved successfully",
        data: result,
    });
});

export const SaleControllers = {
    addASaleInfo,
    getSalesHistory,
};
