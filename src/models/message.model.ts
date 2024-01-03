import mongoose, { Schema, model } from "mongoose";
import { User } from "./user.model";
import { Discussion } from "./discussion.model";


export interface Message {
    _id: Schema.Types.ObjectId | mongoose.Types.ObjectId | string;
    text: string;
    reply_to?: Message;
    date: Date;
    sender: User;
    receiver: Discussion;
}


export interface MessageDTO {
    text: string;
    reply_to?: string;
    date: Date;
    sender: string;
    receiver: string;
}

const messageSchema = new Schema<Message>({
    text: [{
        type: String,
        required: [true, 'Please enter a message'],
    }],
    reply_to: {
        type: Schema.Types.ObjectId,
        ref: 'Message',
    },
    date: {
        type: Date,
        required: [true, 'Please enter a date'],
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please enter a sender'],
    },
    receiver: {
        type: Schema.Types.ObjectId,
        ref: 'Discussion',
        required: [true, 'Please enter a sender'],
    }
}, { timestamps: true });


export const MessageModel = model<Message>('Message', messageSchema);