import { Schema, model } from "mongoose";
import { TUser, UserModel } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";

const userSchema = new Schema<TUser, UserModel>(
    {
        name: {
            type: String,
            required: true,
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
            select: false,
        },
        role: {
            type: String,
            enum: ["buyer", "seller"],
            required: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

userSchema.pre("save", async function (next) {
    // hashing password and save into DB
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this;
    user.password = await bcrypt.hash(
        user.password,
        Number(config.bcrypt_salt_rounds),
    );
    next();
});

userSchema.statics.isUserExistsByEmail = async function (email: string) {
    return await User.findOne({ email }).select("+password");
};

userSchema.statics.isPasswordMatched = async function (
    plainTextPassword,
    hashedPassword,
) {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
};

export const User = model<TUser, UserModel>("User", userSchema);
