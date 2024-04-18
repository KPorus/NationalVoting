import mongoose from "mongoose";
interface IValidationError { message: string, kind: string, reason?: string, stack?: string }
const handleValidationError = (
    error: mongoose.Error.ValidationError
) =>
{
    const { errors, message } = error;
    const errorMessage = message || 'Validation failed';
    let reasonValue:any;
    let stackValue:any
    let kindValue:any
    
    Object.keys(errors).forEach((key) =>
    {
        const { kind, reason, stack } = errors[key];
        if (process.env.NODE_ENV === 'development')
        {
            reasonValue = reason?.toString();
            stackValue = stack?.toString();
            kindValue=kind
        }
    });

    return {
        statusCode: 400,
        message: errorMessage,
        reasonValue,stackValue,kindValue
    };
};

export default handleValidationError;
