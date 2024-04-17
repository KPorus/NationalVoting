import { ObjectId, Schema, Types } from "mongoose";

export interface Body {
    email: string,
    pass: string
}

export interface AdminBody {
    _id: ObjectId,
    email: string,
    role: string
}

export interface VoterBody {
    _id: ObjectId,
    email: string,
    voteCandidate: ObjectId | null
    voterId: string,
}

export interface UploadResult {
    numberOfCandidate: number;
    numberOfUsers: number;
}

