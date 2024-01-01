import { Schema, model } from "mongoose";

export interface Command {
    client: Schema.Types.ObjectId;
    deliverer: Schema.Types.ObjectId;
    // products: Schema.Types.ObjectId[];
    status: "pending" | "accepted" | "delivered" | "canceled";
    price: number;
    position: [{
        latitude: number;
        longitude: number;
    }];
    track: {
        latitude: number;
        longitude: number;
        date: Date;
    };
}

const commandSchema = new Schema<Command>({
    client: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please enter a client'],
    },
    deliverer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please enter a deliverer'],
    },
    // products: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'Product',
    //     required: [true, 'Please enter a product'],
    // }],
    status: {
        type: String,
        required: [true, 'Please enter a status'],
        lowercase: true,
        enum: ["pending", "accepted", "delivered", "canceled"]
    },
    price: {
        type: Number,
        required: [true, 'Please enter a price'],
    },
    position: [{
        latitude: {
            type: Number,
            required: [true, 'Please enter a latitude'],
        },
        longitude: {
            type: Number,
            required: [true, 'Please enter a longitude'],
        }
    }],
    track: {
        latitude: {
            type: Number,
        },
        longitude: {
            type: Number,
        },
        date: {
            type: Date,
        }
    }
}, { timestamps: true });

export const CommandModel = model<Command>('Command', commandSchema);
