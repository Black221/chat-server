import { Schema, model } from 'mongoose';
import { users } from './authenticationModels';


export interface Deliverer {
    user: Schema.Types.ObjectId;
    email: string;
    dateOfBirth: string;
    placeOfBirth: string;
    cni: string;
    cniRectoUrl: string;
    cniVersoUrl: string;
}

const delivererSchema = new Schema<Deliverer>({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please enter a user'],
    },
    email: {
        type: String,
        lowercase: true,
    },
    dateOfBirth: {
        type: String,
        required: [true, 'Please enter a date of birth'],
        lowercase: true,
    },
    placeOfBirth: {
        type: String,
        required: [true, 'Please enter a place of birth'],
        lowercase: true,
    },
    cni: {
        type: String,
        required: [true, 'Please enter a cni'],
        lowercase: true,
    },
    cniRectoUrl: {
        type: String,
        required: [true, 'Please enter a cni recto url'],
        lowercase: true,
    },
    cniVersoUrl: {
        type: String,
        required: [true, 'Please enter a cni verso url'],
        lowercase: true,
    }
}, { timestamps: true });

export const DelivererModel = model<Deliverer>('Deliverer', delivererSchema);
