import { AdminInfo } from '../app/models/admin/admininfo.model';
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import { Types } from 'mongoose';
import { UserInfo } from '../app/models/users/userinfo.model';
type jwtTest = jwt.JwtPayload | {
    _id: Types.ObjectId
}
const adminMiddleware = async (req: Request, res: Response, next: NextFunction) =>
{
    try
    {
        // Check if the authorization header is present in the request
        if (!req.headers["authorization"])
        {
            return res.status(401).json({ message: "Not logged in" });
        }

        // Extract the token from the authorization header
        const authHeader = req.headers["authorization"];
        const bearerToken = authHeader.split(" ");
        const token = bearerToken[0];
        try
        {
            // Verify the token using the JWT_SECRET from environment variables
            let decodedToken = jwt.verify(token, process.env.JWT_SECRET as string);
            const verifyUser = decodedToken as jwtTest;
            if (verifyUser && 'id' in verifyUser)
            {
                // Fetch the user from the database using the decoded token
                const user = await AdminInfo.findOne({ _id: verifyUser.id });
                // Attach the user to the request object
                if(user?.role == "admin")
                {
                    req.user = user;
                    next();
                }else{
                    return res.status(401).json({ message: "Unauthorized" });
                }
            }else{
                return res.status(401).json({ message: "Unauthorized" });
            }

            
        } catch (err)
        {
            // Handle errors from jwt.verify
            return res.status(401).json({ message: "Unauthorized" });
        }
    } catch (err)
    {
        next(err);
    }
}

const userMiddleware = async (req: Request, res: Response, next: NextFunction) =>
{
    try
    {
        // Check if the authorization header is present in the request
        if (!req.headers["authorization"])
        {
            return res.status(401).json({ message: "Not logged in" });
        }

        // Extract the token from the authorization header
        const authHeader = req.headers["authorization"];
        const bearerToken = authHeader.split(" ");
        const token = bearerToken[0];
        try
        {
            // Verify the token using the JWT_SECRET from environment variables
            let decodedToken = jwt.verify(token, process.env.JWT_SECRET as string);
            const verifyUser = decodedToken as jwtTest;
            if (verifyUser && 'id' in verifyUser)
            {
                // Fetch the user from the database using the decoded token
                const user = await UserInfo.findOne({ _id: verifyUser.id });

                // Attach the user to the request object
                if (user?.role == "user")
                {
                    req.user = user;
                    next();
                } else
                {
                    return res.status(401).json({ message: "Unauthorized" });
                }
            } else
            {
                return res.status(401).json({ message: "Unauthorized" });
            }
        } catch (err)
        {
            // Handle errors from jwt.verify
            return res.status(401).json({ message: "Unauthorized" });
        }
    } catch (err)
    {
        next(err);
    }
}
export const protect = {adminMiddleware,userMiddleware}