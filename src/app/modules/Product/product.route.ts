import express from "express";
import { ProductControllers } from "./product.controller";
import auth from "../../middlewares/auth";
import { ProductValidators } from "./product.validator";
import validateRequest from "../../middlewares/validateRequest";

const router = express.Router();

router.post(
    "/",
    auth("seller"),
    validateRequest(ProductValidators.createProductValidatorSchema),
    ProductControllers.addProduct,
);

router.get("/", auth("seller", "buyer"), ProductControllers.getAllProducts);

router.get("/:id", ProductControllers.getAProductById);

router.patch(
    "/:id",
    auth("seller"),
    validateRequest(ProductValidators.updateProductValidatorSchema),
    ProductControllers.updateAProductById,
);

router.delete("/:id", ProductControllers.deleteAProductById);

router.put("/bulk-product-delete", ProductControllers.bulkProductDelete);

export const ProductRoutes = router;
