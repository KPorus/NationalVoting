import { Schema, model, ObjectId } from 'mongoose';
// Creating an interface
export interface Info
{
    _id: ObjectId,
    email: string,
    pass: string,
    // voteCandidate: Types.ObjectId | null
    role: string,
    voterId: string,
}

const infoSchema = new Schema<Info>({
    email: {
        type: String,
        required: [true, "Title should not be empty!"], unique: true
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
    voterId: { type: String, required: [true, "Please provide voter id."], unique: true }
}, { timestamps: true });

export const UserInfo = model<Info>('UserInfo', infoSchema);