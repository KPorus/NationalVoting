import { ObjectId } from "mongoose";

export interface Body {
    email: string,
    pass: string
}

export interface AdminBody {
    email: string,
    role: string
}

export interface VoterBody {
    email: string,
    voteCandidate: ObjectId | null
    voterId: string,
}

export interface UploadResult {
    numberOfCandidate: number;
    numberOfUsers: number;
}

