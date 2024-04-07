import jwt from "jsonwebtoken"
import { Request, Response } from "express";
import { userService } from "./user.service";

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

const login = async (req: Request, res: Response) =>
{
    try
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
                return res.status(404).json({ status: "Fail", message: "Password not match" })
            }
        }
        else
        {
            return res.status(404).json({ status: "Fail", message: "user not found" })
        }
    } catch (err)
    {
        res.status(500).json({ status: "Fail", message: `Internal server error. ${err}` })
    }
}

const register = async (req: Request, res: Response) =>
{
    try
    {
        const user = await userService.register(req.body)
        if (user)
        {
            return res.status(200).json({ status: "succes", message: "User registered succesfully" })
        }
        else
        {
            return res.status(400).json({ status: "Fail", message: "User not registered. Please check your network connection or Check your email and your voter Id. Two account same email is not acceptable. Different email and same voter id not acceptable." })
        }
    } catch (err)
    {
        res.status(500).json({ status: "Fail", message: `Internal server error. ${err}` })
    }
}

const vote = async (req: Request, res: Response) =>
{
    try
    {
        const user = await userService.vote(req.body)
        if (user)
        {
            return res.status(200).json({ status: "succes", message: "Vote successfull" })
        }
        else
        {
            return res.status(400).json({ status: "Fail", message: "Vote unsuccessfull." })
        }
    } catch (err)
    {
        res.status(500).json({ status: "Fail", message: `Internal server error. ${err}` })
    }
}
const allCandidate = async (req: Request, res: Response) =>
{
    try
    {
        const user = await userService.allCandidate()
        if (user?.length>0)
        {
            return res.status(200).json({ status: "succes", view:"user", user })
        }
        else
        {
            return res.status(400).json({ status: "Fail", message: "Candidate not found" })
        }
    } catch (err)
    {
        res.status(500).json({ status: "Fail", message: `Internal server error. ${err}` })
    }
}
export const userController = {
    login, register, vote, allCandidate
}