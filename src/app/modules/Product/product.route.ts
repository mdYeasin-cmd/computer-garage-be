import express from "express";
import { ProductControllers } from "./product.controller";

const router = express.Router();

router.post("/", ProductControllers.addProduct);

router.get("/", ProductControllers.getAllProducts);

router.get("/:id", ProductControllers.getAProductById);

router.patch("/:id", ProductControllers.updateAProductById);

router.delete("/:id", ProductControllers.deleteAProductById);

export const ProductRoutes = router;
