import { Schema, model, Types } from 'mongoose';
// Creating an interface
export interface votingInfo
{
    _id?: Types.ObjectId,
    candidateId: Types.ObjectId | null,
    userId: Types.ObjectId | null,
    userVoterId: string | null,
}

const votingInfoSchema = new Schema<votingInfo>({
    candidateId: {
        type: Types.ObjectId,
        ref: 'Candidate'
    },
    userId: {
        type: Types.ObjectId,
        ref: 'UserInfo'
    },
    userVoterId: { type: String, required:[true, "Missing voter voter id."]},

}, { timestamps: true });


export const votingInfoList = model<votingInfo>('VotingInfo', votingInfoSchema);