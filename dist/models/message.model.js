"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageModel = void 0;
const mongoose_1 = require("mongoose");
const messageSchema = new mongoose_1.Schema({
    text: [{
            type: String,
            required: [true, 'Please enter a message'],
        }],
    reply_to: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Message',
    },
    date: {
        type: Date,
        required: [true, 'Please enter a date'],
    },
    sender: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please enter a sender'],
    },
    receiver: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Discussion',
        required: [true, 'Please enter a sender'],
    }
}, { timestamps: true });
exports.MessageModel = (0, mongoose_1.model)('Message', messageSchema);
