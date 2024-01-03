
import mongoose, { Schema, model } from "mongoose";
import { Message } from "./message.model";
import { User } from "./user.model";


export interface Discussion {
    _id: Schema.Types.ObjectId | mongoose.Types.ObjectId | string;
    img: string;
    name: string;
    users: User[];
    messages?: Message[];
    created_by: User;
}

export interface DiscussionDTO {
    img: string;
    name: string;
    users: string[];
    created_by: string;
}

const discussionSchema = new Schema<Discussion>({
    img: {
        type: String,
        required: [true, 'Please enter a img'],
    },
    name: {
        type: String,
        required: [true, 'Please enter a name'],
    },
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }],
    created_by: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please enter a sender'],
    }
}, { timestamps: true });

export const DiscussionModel = model<Discussion>('Discussion', discussionSchema);