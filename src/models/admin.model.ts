import { Schema, model, Types } from "mongoose";

export interface Admin {
    user: Schema.Types.ObjectId;
    permissions: string[];
}

const adminSchema = new Schema<Admin>({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please enter a user'],
    },
    permissions: [{
        type: String,
        required: [true, 'Please enter a permission'],
        lowercase: true,
    }]
}, { timestamps: true });


export const AdminModel = model<Admin>('Admin', adminSchema);