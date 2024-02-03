import z from "zod";

const createProductValidatorSchema = z.object({
    body: z.object({
        category: z.string({
            required_error: "Category is required",
            invalid_type_error: "Category must be a string",
        }),
        brand: z.string({
            required_error: "Brand is required",
            invalid_type_error: "Brand must be a string",
        }),
        name: z.string({
            required_error: "Name is required",
            invalid_type_error: "Name must be a string",
        }),
        compatibility: z.string({
            required_error: "Compatibility is required",
            invalid_type_error: "Compatibility must be a string",
        }),
        quantity: z
            .number({
                required_error: "Quantity is required",
                invalid_type_error: "Quantity must be a integer number",
            })
            .int()
            .positive(),
        interface: z.string({
            required_error: "Interface is required",
            invalid_type_error: "Interface must be a string",
        }),
        condition: z.string({
            required_error: "Condition is required",
            invalid_type_error: "Condition must be a string",
        }),
        capacity: z.string({
            required_error: "Capacity is required",
            invalid_type_error: "Capacity must be a string",
        }),
        price: z
            .number({
                required_error: "Price is required",
                invalid_type_error: "Price must be a positive number",
            })
            .positive(),
        warrantyPeriod: z
            .number({
                required_error: "Warranty period is required",
                invalid_type_error: "Warranty period must be a positive number",
            })
            .positive(),
        color: z
            .string({
                invalid_type_error: "Color must be a string",
            })
            .optional(),
        availability: z.enum(["in stock", "out of stock"]).refine(
            (value) => {
                return value === "in stock" || value === "out of stock";
            },
            {
                message:
                    "Availability must be either 'in stock' or 'out of stock'",
            },
        ),
    }),
});

export const ProductValidators = {
    createProductValidatorSchema,
};
