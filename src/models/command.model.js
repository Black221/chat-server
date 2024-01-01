"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandModel = void 0;
const mongoose_1 = require("mongoose");
const commandSchema = new mongoose_1.Schema({
    client: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please enter a client'],
    },
    deliverer: {
        type: mongoose_1.Schema.Types.ObjectId,
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
exports.CommandModel = (0, mongoose_1.model)('Command', commandSchema);
