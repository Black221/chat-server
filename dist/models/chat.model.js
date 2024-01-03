"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatModel = void 0;
const mongoose_1 = require("mongoose");
const chatSchema = new mongoose_1.Schema({
    messages: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Message',
        }],
}, { timestamps: true });
exports.ChatModel = (0, mongoose_1.model)('Chat', chatSchema);
