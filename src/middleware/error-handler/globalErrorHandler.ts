import { ErrorRequestHandler } from "express";
import handleCastError from "../../utils/errors/handleCastError";
import handleValidationError from "../../utils/errors/handleValidationError";
import { handleJsonSyntaxError } from "../../utils/errors/handleSyntexError";

export const globalError: ErrorRequestHandler = (error, req, res, next) =>
{
    //console.log("global error1",error);
    let statusCode = error.code || 500;
    let status = error.status || 'error'
    let message = error.message ||"Something went wrong"
    let stack = ''
    let kind = ''
    let reason = ''

    if (error.name === "CastError")
    {
        const result = handleCastError(error);
        message = result.message;
        status = result.statusCode >= 400 && result.statusCode < 500 ? 'fail' : 'error';
        statusCode = result.statusCode;
        stack =result.stack
        kind=result.kind
        reason=result.reason
    } else if (error.name === "ValidationError")
    {
        const result = handleValidationError(error);
        message = result.message;
        status = result.statusCode >= 400 && result.statusCode < 500 ? 'fail' : 'error';
        statusCode = result.statusCode;
        stack = result.stackValue
        kind = result.kindValue
        reason = result.reasonValue
    }
    else if (error.name === "SyntaxError"){
        const result = handleJsonSyntaxError(error);
        message = result.message;
        status = result.statusCode >= 400 && result.statusCode < 500 ? 'fail' : 'error';
        statusCode = result.statusCode;
        stack = result.invalidJson
    }
    else if (error instanceof Error)
    {
        message = error.message;   
    }

    if (process.env.NODE_ENV === "development")
    {
        res.status(statusCode).json({
            code: statusCode,
            status: status,
            message: message,
            stack: stack,
            kind: kind,
            reason: reason
        })
    }
    res.status(statusCode).json({
        code: statusCode,
        status: status,
        message: message
    })
}