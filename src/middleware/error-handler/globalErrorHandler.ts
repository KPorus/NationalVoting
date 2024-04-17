import { ErrorRequestHandler } from "express";

export const globalError: ErrorRequestHandler = (error,req,res,next)=>{
    error.statusCode=error.statusCode || 500;
    error.status = error.status || 'error'

    res.status(error.statusCode).json({
        code: error.statusCode,
        status:error.status,
        message:error.message
    })
}