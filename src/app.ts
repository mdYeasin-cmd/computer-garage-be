import express, { Application, Request, Response } from "express";
import cors from "cors";
import sendResponse from "./app/utils/sendResponse";
import httpStatus from "http-status";
import notFound from "./app/middlewares/notFound";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import router from "./app/routes";

const app: Application = express();

// parsers
app.use(express.json());
app.use(
    cors({
        origin: ["http://localhost:5173"],
    }),
);

// application routes
app.use("/api/v1", router);

// testing route
app.get("/", (req: Request, res: Response) => {
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "",
        data: "Computer Garage server is running...",
    });
});

// global error handler
app.use(globalErrorHandler);

// not found route
app.use(notFound);

export default app;
