import { TUser } from "./user.interface";
import { User } from "./user.model";

const registerUserIntoDB = async (payload: TUser) => {
    const result = await User.create(payload);

    return result;
};

const loginUser = async (payload: Partial<TUser>) => {
    // const result = await User.create(payload);
    // return result;
};

export const UserServices = {
    registerUserIntoDB,
    loginUser,
};
