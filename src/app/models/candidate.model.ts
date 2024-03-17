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
    symbolImg?: string
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
    }

}, { timestamps: true });

// Define unique index on 'name' and 'wardNo'
candidateSchema.index({ name: 1, wardNo: 1 }, { unique: true });


export const CandidateList = model<Candidate>('Candidate', candidateSchema);