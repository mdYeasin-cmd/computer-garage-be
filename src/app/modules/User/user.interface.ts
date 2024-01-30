/* eslint-disable no-unused-vars */
import { Model } from "mongoose";

export type TUser = {
    name: string;
    email: string;
    photoUrl?: string;
    password: string;
};

export interface UserModel extends Model<TUser> {
    isUserExistsByEmail(email: string): Promise<TUser>;
    isPasswordMatched(
        plainTextPassword: string,
        hashedPassword: string,
    ): Promise<boolean>;
}
