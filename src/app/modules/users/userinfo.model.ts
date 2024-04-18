import { Schema, model} from 'mongoose';

export interface Info
{
    _id: any;
    email: string,
    pass: string,
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
        required: [true, "Please provide a password!"]
    },
    role: { type: String },
    voterId: { type: String, required: [true, "Please provide voter id."], unique: true }
}, { timestamps: true });

export const UserInfo = model<Info>('UserInfo', infoSchema);