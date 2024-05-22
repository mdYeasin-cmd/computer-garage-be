import express from "express";
import { SaleControllers } from "./sale.controller";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post("/", auth("seller"), SaleControllers.addASaleInfo);

router.get("/history", auth("seller"), SaleControllers.getSalesHistory);

export const SaleRoutes = router;
