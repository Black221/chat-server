import { Schema, model } from "mongoose";

export interface Client {
    user: Schema.Types.ObjectId;
    position: {
        latitude: number;
        longitude: number;
    };
}

const clientSchema = new Schema<Client>({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please enter a user'],
    },
    position: {
        latitude: {
            type: Number,
        },
        longitude: {
            type: Number,
        }
    }
}, { timestamps: true });

export const ClientModel = model<Client>('Client', clientSchema);