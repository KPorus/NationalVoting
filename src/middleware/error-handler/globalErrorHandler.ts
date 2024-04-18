import { ErrorRequestHandler } from "express";
import handleCastError from "../../utils/errors/handleCastError";
import handleValidationError from "../../utils/errors/handleValidationError";

export const globalError: ErrorRequestHandler = (error, req, res, next) =>
{
    console.log("global error1",error.name);
    let statusCode = error.code || 500;
    let status = error.status || 'error'
    let message = error.message ||"Something went wrong"
    let stack = ''
    let kind = ''
    let reason = ''

    if (error.name === "CastError")
    {
        const result = handleCastError(error);
        console.log(result);
        message = result.message;
        status = result.statusCode >= 400 && result.statusCode < 500 ? 'fail' : 'error';
        statusCode = result.statusCode;
        stack =result.stack
        kind=result.kind
        reason=result.reason
    } else if (error.name === "ValidationError")
    {
        const result = handleValidationError(error);
        console.log(result);
        message = result.message;
        status = result.statusCode >= 400 && result.statusCode < 500 ? 'fail' : 'error';
        statusCode = result.statusCode;
        stack = result.stackValue
        kind = result.kindValue
        reason = result.reasonValue
    }
     else if (error instanceof Error)
    {
        message = error.message;   
    }

    res.status(statusCode).json({
        code: statusCode,
        status: status,
        message: message,
        stack:stack,
        kind:kind,
        reason:reason
    })
}