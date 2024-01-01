"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatModel = void 0;
const mongoose_1 = require("mongoose");
const chatSchema = new mongoose_1.Schema({
    message: {
        type: String,
        required: [true, 'Please enter a message'],
        lowercase: true,
    },
    sender: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please enter a sender'],
    },
    receiver: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please enter a sender'],
    }
}, { timestamps: true });
exports.ChatModel = (0, mongoose_1.model)('Chat', chatSchema);
