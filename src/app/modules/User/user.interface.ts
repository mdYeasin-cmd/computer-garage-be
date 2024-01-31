/* eslint-disable no-unused-vars */
import { Document, Model } from "mongoose";

export interface TUser extends Document {
    name: string;
    email: string;
    photoUrl?: string;
    password: string;
}

export interface UserModel extends Model<TUser> {
    isUserExistsByEmail(email: string): Promise<TUser>;
    isPasswordMatched(
        plainTextPassword: string,
        hashedPassword: string,
    ): Promise<boolean>;
}
