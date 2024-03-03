import z from "zod";

const createProductValidatorSchema = z.object({
    body: z.object({
        name: z.string({
            required_error: "Name is required",
            invalid_type_error: "Name must be a string",
        }),
        category: z.string({
            required_error: "Category is required",
            invalid_type_error: "Category must be a string",
        }),
        brand: z.string({
            required_error: "Brand is required",
            invalid_type_error: "Brand must be a string",
        }),
        price: z
            .number({
                required_error: "Price is required",
                invalid_type_error: "Price must be a positive number",
            })
            .positive(),
        quantity: z
            .number({
                required_error: "Quantity is required",
                invalid_type_error: "Quantity must be a integer number",
            })
            .int()
            .positive(),
        availability: z.enum(
            ["In stock", "Out of stock"] as [string, ...string[]],
            {
                errorMap: (issue) => {
                    switch (issue.code) {
                        case "invalid_type":
                            return {
                                message:
                                    "Availability status  must be a string",
                            };
                        case "invalid_enum_value":
                            return {
                                message:
                                    "Availability value must be 'In stock' or 'Out of stock'",
                            };
                        default:
                            return { message: "Availability is required" };
                    }
                },
            },
        ),
        warrantyPeriod: z
            .number({
                invalid_type_error: "Warranty period must be a positive number",
            })
            .positive()
            .optional(),
        compatibility: z
            .string({
                invalid_type_error: "Compatibility must be a string",
            })
            .optional(),
        interface: z
            .string({
                invalid_type_error: "Interface must be a string",
            })
            .optional(),
        color: z
            .string({
                invalid_type_error: "Color must be a string",
            })
            .optional(),
        capacity: z
            .string({
                invalid_type_error: "Capacity must be a string",
            })
            .optional(),
        condition: z
            .string({
                invalid_type_error: "Condition must be a string",
            })
            .optional(),

        description: z
            .string({
                invalid_type_error: "Color must be a string",
            })
            .optional(),
    }),
});

const updateProductValidatorSchema = z.object({
    body: z.object({
        name: z
            .string({
                invalid_type_error: "Name must be a string",
            })
            .optional(),
        category: z
            .string({
                invalid_type_error: "Category must be a string",
            })
            .optional(),
        brand: z
            .string({
                invalid_type_error: "Brand must be a string",
            })
            .optional(),
        price: z
            .number({
                invalid_type_error: "Price must be a positive number",
            })
            .positive()
            .optional(),
        quantity: z
            .number({
                invalid_type_error: "Quantity must be a integer number",
            })
            .int()
            .positive()
            .optional(),
        availability: z
            .enum(["In stock", "Out of stock"] as [string, ...string[]], {
                errorMap: (issue) => {
                    switch (issue.code) {
                        case "invalid_type":
                            return {
                                message:
                                    "Availability status  must be a string",
                            };
                        case "invalid_enum_value":
                            return {
                                message:
                                    "Availability value must be 'In stock' or 'Out of stock'",
                            };
                        default:
                            return { message: "" };
                    }
                },
            })
            .optional(),
        warrantyPeriod: z
            .number({
                invalid_type_error: "Warranty period must be a positive number",
            })
            .positive()
            .optional(),
        compatibility: z
            .string({
                invalid_type_error: "Compatibility must be a string",
            })
            .optional(),
        interface: z
            .string({
                invalid_type_error: "Interface must be a string",
            })
            .optional(),
        color: z
            .string({
                invalid_type_error: "Color must be a string",
            })
            .optional(),
        capacity: z
            .string({
                invalid_type_error: "Capacity must be a string",
            })
            .optional(),
        condition: z
            .string({
                invalid_type_error: "Condition must be a string",
            })
            .optional(),
        description: z
            .string({
                invalid_type_error: "Color must be a string",
            })
            .optional(),
    }),
});

export const ProductValidators = {
    createProductValidatorSchema,
    updateProductValidatorSchema,
};
