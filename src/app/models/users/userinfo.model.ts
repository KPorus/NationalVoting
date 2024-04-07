import { Schema, model, ObjectId, Types } from 'mongoose';
// Creating an interface
export interface Info
{
    _id: ObjectId,
    email: string,
    pass: string,
    // voteCandidate: Types.ObjectId | null
    role: string,
    voterId:string,
}

const infoSchema = new Schema<Info>({
    email: {
        type: String,
        required: [true, "Title should not be empty!"]
    },

    pass: {
        type: String,
        required: [true, "Body should not be empty!"]
    },
    // voteCandidate: {
    //     type: Types.ObjectId,
    //     ref: 'Candidate'
    // },
    role: { type: String },
    voterId:{type:String, required:[true, "Please provide voter id."]}
}, { timestamps: true });

export const UserInfo = model<Info>('UserInfo', infoSchema);