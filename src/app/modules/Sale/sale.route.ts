import express from "express";
import { SaleControllers } from "./sale.controller";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post("/", auth("seller", "buyer"), SaleControllers.addASaleInfo);

router.get("/sale-history", auth("seller"), SaleControllers.getSalesHistory);

router.get(
    "/purchase-history",
    auth("buyer"),
    SaleControllers.getPurchasesHistory,
);

export const SaleRoutes = router;
