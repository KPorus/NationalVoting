import { RequestHandler } from "express-serve-static-core";


export const CatchAsync = (fn: RequestHandler): RequestHandler =>
{
    return async (req, res, next) =>
    {
        try
        {
            await fn(req, res, next)
        } catch (err)
        {
            next(err);
        }
    }
}
