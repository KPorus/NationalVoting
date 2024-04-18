import mongoose from "mongoose";

interface ICastErrorRes
{
    statusCode: number,
    message: string,
    stack?: any,
    kind?: any,
    reason?: any
}

const handleCastError = (error: mongoose.Error.CastError) =>
{
    const { path, model, value, stack, kind, reason } = error;

    const errorMessage = `Failed to cast value "${value}" to ObjectId at path "${path}" for model "${model.modelName}".`;

    const errorResponse: ICastErrorRes = {
        statusCode: 400,
        message: process.env.NODE_ENV === "development" ? errorMessage : "Invalid Id",
    };

    if (process.env.NODE_ENV === "development")
    {
        if (stack) errorResponse.stack = stack;
        if (kind) errorResponse.kind = kind;
        if (reason) errorResponse.reason = reason;
    }

    return errorResponse;
}

export default handleCastError;
