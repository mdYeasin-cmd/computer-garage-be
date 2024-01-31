import jwt from "jsonwebtoken";
import AppError from "../../errors/AppError";

export const generateToken = (
    jwtPayload: { email: string },
    secret: string,
    expiresIn: string,
) => {
    try {
        return jwt.sign(jwtPayload, secret, {
            expiresIn,
        });
    } catch (error) {
        throw new AppError(500, "Failed to login. Please try again.");
    }
};
