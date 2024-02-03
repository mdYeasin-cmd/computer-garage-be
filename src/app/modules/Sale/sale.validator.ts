import z from "zod";

const createSaleValidatorSchema = z.object({
    body: z.object({
        productId: z.string({
            required_error: "Product id is required",
            invalid_type_error: "Product id must be a string",
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
