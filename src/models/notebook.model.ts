import mongoose, { Schema, model } from "mongoose";
import { User } from "./user.model";


export interface Notebook {
    _id: Schema.Types.ObjectId | mongoose.Types.ObjectId | string;
    title: string;
    content: string;
    owner: User;
    shared_users?: User[];
}

const notebookSchema = new Schema<Notebook>({
    title: {
        type: String,
        required: [true, 'Please enter a title'],
    },
    content: {
        type: String,
        required: [true, 'Please enter a content'],
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please enter a owner'],
    },
    shared_users: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }],
}, { timestamps: true });


export const NotebookModel = model<Notebook>('Notebook', notebookSchema);