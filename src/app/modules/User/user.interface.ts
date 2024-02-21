/* eslint-disable no-unused-vars */
import { Document, Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export interface TUser extends Document {
    name: string;
    email: string;
    photoUrl?: string;
    password: string;
    role: "user";
}

export interface UserModel extends Model<TUser> {
    isUserExistsByEmail(email: string): Promise<TUser>;
    isPasswordMatched(
        plainTextPassword: string,
        hashedPassword: string,
    ): Promise<boolean>;
}

export type TUserRole = keyof typeof USER_ROLE;
