import express from "express";
import { UserRoutes } from "../modules/User/user.route";
import { ProductRoutes } from "../modules/Product/product.route";
import { SaleRoutes } from "../modules/Sale/sale.route";

const router = express.Router();

const moduleRoutes = [
    {
        path: "/users",
        route: UserRoutes,
    },
    {
        path: "/products",
        route: ProductRoutes,
    },
    {
        path: "/sales",
        route: SaleRoutes,
    },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
