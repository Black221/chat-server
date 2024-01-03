"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscussionModel = void 0;
const mongoose_1 = require("mongoose");
const discussionSchema = new mongoose_1.Schema({
    img: {
        type: String,
        required: [true, 'Please enter a img'],
    },
    name: {
        type: String,
        required: [true, 'Please enter a name'],
    },
    users: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'User',
        }],
    created_by: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please enter a sender'],
    }
}, { timestamps: true });
exports.DiscussionModel = (0, mongoose_1.model)('Discussion', discussionSchema);
