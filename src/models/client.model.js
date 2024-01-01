"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientModel = void 0;
const mongoose_1 = require("mongoose");
const clientSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
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
exports.ClientModel = (0, mongoose_1.model)('Client', clientSchema);
