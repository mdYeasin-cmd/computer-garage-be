import express from "express";
import { SaleControllers } from "./sale.controller";

const router = express.Router();

router.post("/", SaleControllers.addASaleInfo);

router.get("/history", SaleControllers.getSalesHistory);

export const SaleRoutes = router;
