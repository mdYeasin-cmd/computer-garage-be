/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import { TErrorSources, TGenericErrorResponse } from "../interfaces/error";

const handleDuplicateError = (err: any): TGenericErrorResponse => {
    const statusCode = httpStatus.BAD_REQUEST;

    const match = err.message.match(/"([^"]*)"/);

    const extractedMessage = match && match[1];

    const errorSources: TErrorSources = [
        {
            path: "",
            message: `${extractedMessage} is already exists`,
        },
    ];

    return {
        statusCode,
        message: "Duplicate value!",
        errorSources,
    };
};

export default handleDuplicateError;
