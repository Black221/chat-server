"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotebookModel = void 0;
const mongoose_1 = require("mongoose");
const notebookSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, 'Please enter a title'],
    },
    content: {
        type: String,
        required: [true, 'Please enter a content'],
    },
    owner: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please enter a owner'],
    },
    shared_users: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'User',
        }],
}, { timestamps: true });
exports.NotebookModel = (0, mongoose_1.model)('Notebook', notebookSchema);
