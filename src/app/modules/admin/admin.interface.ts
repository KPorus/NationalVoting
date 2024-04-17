import { ObjectId, Schema } from "mongoose";

export interface Body
{
    email: string,
    pass: string
}

export interface AdminBody
{
    _id: ObjectId,
    email: string,
    role: string
}

export interface VoterBody
{
    _id: ObjectId,
    email: string,
    voteCandidate: ObjectId | null
    voterId: string,
}
export interface VoterPage
{
    pageIndex: number,
    next?: Schema.Types.ObjectId,
    prev?: Schema.Types.ObjectId,
    pageSize: number
}
export interface UploadResult
{
    numberOfCandidate: number;
    numberOfUsers: number;
}

