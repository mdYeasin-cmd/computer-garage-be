import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.service";

const registerUser = catchAsync(async (req, res) => {
    const userData = req.body;

    const result = await UserServices.registerUserIntoDB(userData);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User is created succesfully",
        data: result,
    });
});

const loginUser = catchAsync(async (req, res) => {
    const userData = req.body;

    const result = await UserServices.loginUser(userData);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User is logged in succesfully",
        data: result,
    });
});

export const UserControllers = {
    registerUser,
    loginUser,
};
