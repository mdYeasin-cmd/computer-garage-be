import z from "zod";

const createSaleValidatorSchema = z.object({
    body: z.object({
        sellerId: z.string({
            required_error: "Seller id is required",
            invalid_type_error: "Seller id must be a string",
        }),
        buyerId: z
            .string({
                invalid_type_error: "Seller id must be a string",
            })
            .optional(),
        productId: z.string({
            required_error: "Product id is required",
            invalid_type_error: "Product id must be a string",
        }),
        productName: z.string({
            required_error: "Product name id is required",
            invalid_type_error: "Product name id must be a string",
        }),
        quantity: z
            .number({
                required_error: "Quantity is required",
                invalid_type_error: "Quantity must be a number",
            })
            .int()
            .positive(),
        buyerName: z.string({
            required_error: "Buyer name is required",
            invalid_type_error: "Buyer name must be a number",
        }),
        dateOfSale: z.string({
            required_error: "Date of sale is required",
            invalid_type_error: "Date of sale must be a string",
        }),
    }),
});

export const SaleValidators = {
    createSaleValidatorSchema,
};
