import jwt from "jsonwebtoken";

export const generateToken = (
    jwtPayload: { email: string },
    secret: string,
    expiresIn: string,
) => {
    return jwt.sign(jwtPayload, secret, {
        expiresIn,
    });
};
