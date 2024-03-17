import { Schema, model, ObjectId } from 'mongoose';
// Creating an interface
export interface Info
{
    _id: ObjectId,
    email: string,
    pass: string,
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

}, { timestamps: true });

export const UserInfo = model<Info>('UserInfo', infoSchema);