import { CandidateList } from "../../models/candidate.model";
import { Info, UserInfo } from "./userinfo.model"
import { Types } from 'mongoose';
import { votingInfoList } from "../../models/votingInfo.model";
interface Body
{
    email: string,
    pass: string,
    voterId:string,
}

const register = async (data: Body): Promise<Info | null> =>
{
    const check = await UserInfo.findOne({
        $or: [
            { email: data.email },
            { voterId: data.voterId }
        ]
    });

    if (check)
    {
        let user = null;
        return user;
    }
    const value = { ...data, role: "user" };
    const user = await UserInfo.create(value);
    return user
}

const login = async (data: Body): Promise<Info | null> =>
{
    const user = await UserInfo.findOne({
        email: data.email
    });
    return user
}

const vote = async (data: { _id: string, userId: Types.ObjectId }) =>
{
    const candidate = await CandidateList.findOne({ _id: data._id });
    const user = await UserInfo.findOne({ _id: data.userId });
    if (candidate && user)
    {
        const checkVoting = await votingInfoList.findOne({
            $and: [
                { candidateId: candidate._id },
                { userId: user._id }
            ]
        });
        if (checkVoting)
        {
            return null;
        }
        const vote = await votingInfoList.create(
            {
                candidateId: candidate._id,
                userId:user._id,
                userVoterId:user.voterId
            }
        )

        return vote;
        // // Increment votingCount
        // candidate.votingCount = (candidate.votingCount || 0) + 1;
        // user.voteCandidate = candidate._id
        // // Save the updated document
        // await candidate.save();
        // await user.save();
        // return candidate;
    }

    return null;
};
const allCandidate = async () =>
{
    const candidate = await CandidateList.find();
    if (candidate.length > 0)
    {
        return candidate
    }
    return [];
};


export const userService = {
    login, register, vote, allCandidate
}