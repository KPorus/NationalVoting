interface ISynterError{
    statusCode:number,
    message: string,
    invalidJson?:any,
}
export const handleJsonSyntaxError = (error:any) =>
{
    const errorMessage = 'Invalid JSON format';
    const statusCode = error.statusCode || 400;
    const invalidJson = error.body || '';

    const response: ISynterError = {
        statusCode,
        message: errorMessage
    };

    if (process.env.NODE_ENV === "development")
    {
        response.invalidJson = invalidJson;
    }


    return response;
};