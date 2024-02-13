import express from "express";
import { ProductControllers } from "./product.controller";

const router = express.Router();

router.post("/", ProductControllers.addProduct);

router.get("/", ProductControllers.getAllProducts);

router.get("/:id", ProductControllers.getAProductById);

export const ProductRoutes = router;
