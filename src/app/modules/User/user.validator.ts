import z from "zod";

const registerValidatorSchema = z.object({
    body: z.object({
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
            .min(6, {
                message: "Password length must be at least 6 characters",
            })
            .max(32, {
                message: "Password length can't be more then 32 characters",
            }),
        role: z.enum(["buyer", "seller"] as [string, ...string[]], {
            errorMap: (issue) => {
                switch (issue.code) {
                    case "invalid_type":
                        return { message: "Role must be a string" };
                    case "invalid_enum_value":
                        return {
                            message: "Role value must be 'buyer' or 'seller'",
                        };
                    default:
                        return { message: "Role is required" };
                }
            },
        }),
    }),
});

const loginValidatorSchema = z.object({
    body: z.object({
        email: z
            .string({
                required_error: "Email is required",
            })
            .email(),
        password: z.string({
            required_error: "Password is required",
        }),
    }),
});

export const UserValidators = {
    registerValidatorSchema,
    loginValidatorSchema,
};
