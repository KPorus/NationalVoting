import { Schema, model, Types } from 'mongoose';
// Creating an interface
export interface Candidate
{
    _id?: Types.ObjectId,
    name: string,
    Area0fvoting: string,
    wardno: number,
    Address: string,
    union: number,
    status?: string,
    candidateImg?: string,
    symbolImg?: string,
    votingCount:number
}

const candidateSchema = new Schema<Candidate>({
    name: {
        type: String,
        required: [true, "Name should not be empty!"]
    },

    Area0fvoting: {
        type: String,
        required: [true, "Area of voting should not be empty!"]
    },
    Address: {
        type: String
    },
    wardno: {
        type: Number,
        required: true
    },
    union: {
        type: Number,
        required: true
    }, status: { type: String, enum: ["Active", "Withdraw", "Removed"] },
    candidateImg:{
        type:String
    },
    symbolImg:{
        type: String
    },
    votingCount: {
        type: Number,
        default: 0,
        validate: {
            validator: (value: any) => !isNaN(value),
            message: "Voting count must be a number"
        }
    }

}, { timestamps: true });


export const CandidateList = model<Candidate>('Candidate', candidateSchema);