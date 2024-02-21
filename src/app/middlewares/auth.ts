import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../errors/AppError";
import httpStatus from "http-status";
import { TUserRole } from "../modules/User/user.interface";
import { verifyToken } from "../utils/verifyToken";
import { User } from "../modules/User/user.model";

const auth = (...requiredRoles: TUserRole[]) => {
    return catchAsync(
        async (req: Request, res: Response, next: NextFunction) => {
            const token = req.headers.authorization;

            // check if the token is sent from the client!
            if (!token) {
                throw new AppError(
                    httpStatus.UNAUTHORIZED,
                    "You are not authorized!",
                );
            }

            // check if the token is valid!
            const decoded = verifyToken(token);

            req.user = decoded;

            const { email, role } = decoded;

            const user = await User.isUserExistsByEmail(email);

            // check if ther user is exist!
            if (!user) {
                throw new AppError(
                    httpStatus.BAD_REQUEST,
                    "This user is not found!",
                );
            }

            if (requiredRoles && !requiredRoles.includes(role)) {
                throw new AppError(
                    httpStatus.UNAUTHORIZED,
                    "You are not authorized!",
                );
            }

            next();
        },
    );
};

export default auth;
