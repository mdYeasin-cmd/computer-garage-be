import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import config from "../../config";
import { generateToken } from "./user.utils";

const registerUserIntoDB = async (payload: TUser) => {
    const result = await User.create(payload);

    return result;
};

const loginUser = async (payload: Partial<TUser>) => {
    const user = await User.isUserExistsByEmail(payload.email!);

    if (!user) {
        throw new AppError(httpStatus.BAD_REQUEST, "This user is not found!");
    }

    if (!(await User.isPasswordMatched(payload.password!, user?.password))) {
        throw new AppError(httpStatus.FORBIDDEN, "Password do not matched!");
    }

    const jwtPayload = {
        email: user?.email,
    };

    const accessToken = generateToken(
        jwtPayload,
        config.jwt_access_secret as string,
        config.jwt_access_expires_in as string,
    );

    return {
        token: accessToken,
        user,
    };
};

export const UserServices = {
    registerUserIntoDB,
    loginUser,
};
