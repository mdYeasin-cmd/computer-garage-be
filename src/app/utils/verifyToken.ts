import httpStatus from "http-status";
import AppError from "../errors/AppError";
import config from "../config";
import jwt, { JwtPayload } from "jsonwebtoken";

export const verifyToken = (token: string) => {
    try {
        const decoded = jwt.verify(
            token,
            config.jwt_access_secret as string,
        ) as JwtPayload;

        return decoded;
    } catch (error) {
        throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized access");
    }
};
