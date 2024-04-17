import { Schema, model, ObjectId } from 'mongoose';
// Creating an interface
export interface Info {
    _id: ObjectId,
    email: string,
    pass: string,
    role: string
}

const infoSchema = new Schema<Info>({
    email: {
        type: String,
        required: [true, "email should not be empty!"]
    },

    pass: {
        type: String,
        required: [true, "password should not be empty!"]
    },
    role: { type: String }
}, { timestamps: true });

export const AdminInfo = model<Info>('AdminInfo', infoSchema);