import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidators } from "./user.validator";
import { UserControllers } from "./user.controller";

const router = express.Router();

router.post(
    "/register",
    validateRequest(UserValidators.registerValidatorSchema),
    UserControllers.registerUser,
);

router.post(
    "/login",
    validateRequest(UserValidators.loginValidatorSchema),
    UserControllers.loginUser,
);

export const UserRoutes = router;
