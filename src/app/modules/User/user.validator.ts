import z from "zod";

const registerValidatorSchema = z.object({
    name: z.string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string",
    }),
    photoUrl: z
        .string({
            invalid_type_error: "Photo URL must be a string",
        })
        .optional(),
    email: z.string().email(),
    password: z
        .string({
            required_error: "Password is required",
            invalid_type_error: "Password must be a string",
        })
        .min(6, { message: "Password length must be at least 6 characters" })
        .max(32, {
            message: "Password length can't be more then 32 characters",
        }),
});

export const UserValidators = {
    registerValidatorSchema,
};
