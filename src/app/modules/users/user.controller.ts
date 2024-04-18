import { CatchAsync } from './../../../Shared/CatchAsync';
import jwt from "jsonwebtoken"
import { NextFunction, Request, Response } from "express";
import { userService } from "./user.service";
import { CustomError } from "../../../utils/errors/customError";

const signToken = (id: string) =>
{
    return jwt.sign(
        {
            id,
        },
        process.env.JWT_SECRET as string,
        {
            expiresIn: "30d", // Token expiration period
        }
    );
};

const login = CatchAsync(async (req: Request, res: Response, next: NextFunction) =>
{
        const user = await userService.login(req.body);
        if (user)
        {
            if (user.pass == req.body.pass)
            {
                const token = signToken(user._id.toString());
                return res.status(200).json({ status: "Succes", message: "User login succesfull", token: token })
            }
            else
            {
                const err = new CustomError(404, "Password not match")
                next(err);
            }
        }
        else
        {
            const err = new CustomError(404, "user not found")
            next(err);
        }
})

const register = CatchAsync(async (req: Request, res: Response, next: NextFunction) =>
{        const user = await userService.register(req.body)
        if (user)
        {
            return res.status(200).json({ status: "succes", message: "User registered succesfully" })
        }
        else
        {
            const err = new CustomError(400, "User not registered. Please check your network connection or Check your email and your voter Id. Two account same email is not acceptable. Different email and same voter id not acceptable.")
            next(err);
        }
})

const vote = CatchAsync(async (req: Request, res: Response, next: NextFunction) =>
{
    const user = await userService.vote(req.body)
    if (user)
    {
        return res.status(200).json({ status: "succes", message: "Vote successfull" })
    }
    else
    {
        const err = new CustomError(400, "Vote unsuccessfull.")
        next(err);
    }
})
const allCandidate = CatchAsync(async (req: Request, res: Response, next: NextFunction) =>
{
    const user = await userService.allCandidate()
    if (user?.length > 0)
    {
        return res.status(200).json({ status: "succes", view: "user", user })
    }
    else
    {
        const err = new CustomError(404, "Candidate not found")
        next(err);
    }
})

export const userController = {
    login, register, vote, allCandidate
}