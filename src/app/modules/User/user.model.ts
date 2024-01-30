import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";

const userSchema = new Schema<TUser>(
    {
        name: {
            type: String,
            required: true,
        },
        photoUrl: {
            type: String,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
            maxlength: 32,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

export const User = model<TUser>("User", userSchema);
