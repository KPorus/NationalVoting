import { Info, UserInfo } from "../../models/users/userinfo.model"
import { ObjectId } from 'mongoose';
interface Body
{
    email: string,
    pass: string
}

const register = async (data: Body): Promise<Info | null> =>
{
    const check = await UserInfo.findOne({
        email: data.email
    });
    if (check)
    {
        let user = null;
        return user;
    }
    const user = await UserInfo.create(data);
    return user
}

const login = async (data: Body): Promise<Info | null> =>
{
    const user = await UserInfo.findOne({
        email: data.email
    });
    return user
}


export const userService = {
    login, register
}