import { Schema, model, Types } from "mongoose";


export interface Chat {
    message: string;
    // file: Schema.Types.ObjectId;
    sender: Schema.Types.ObjectId;
    receiver: Schema.Types.ObjectId;
}

const chatSchema = new Schema<Chat>({
    message: {
        type: String,
        required: [true, 'Please enter a message'],
        lowercase: true,
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please enter a sender'],
    },
    receiver: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please enter a sender'],
    }
}, { timestamps: true });


export const ChatModel = model<Chat>('Chat', chatSchema);