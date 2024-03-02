import express from "express";
import { ProductControllers } from "./product.controller";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post("/", ProductControllers.addProduct);

router.put("/bulk-product-delete", ProductControllers.bulkProductDelete);

router.get("/", auth("seller", "buyer"), ProductControllers.getAllProducts);

router.get("/:id", ProductControllers.getAProductById);

router.patch("/:id", auth("seller"), ProductControllers.updateAProductById);

router.delete("/:id", ProductControllers.deleteAProductById);

export const ProductRoutes = router;
