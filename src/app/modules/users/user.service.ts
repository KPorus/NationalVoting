import { CandidateList } from "../../models/candidate.model";
import { Info, UserInfo } from "../../models/users/userinfo.model"
import { Types } from 'mongoose';
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

const vote = async (data: { _id: string, userId:Types.ObjectId }) =>
{
    const candidate = await CandidateList.findOne({ _id: data._id });
    const user = await UserInfo.findOne({ _id: data.userId });
    if (candidate && user && !user?.voteCandidate)
    {
        // Increment votingCount
        candidate.votingCount = (candidate.votingCount || 0) + 1;
        user.voteCandidate = candidate._id
        // Save the updated document
        await candidate.save();
        await user.save();
        return candidate;
    }

    return null;
};


export const userService = {
    login, register, vote
}