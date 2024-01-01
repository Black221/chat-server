"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminModel = void 0;
const mongoose_1 = require("mongoose");
const adminSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please enter a user'],
    },
    permissions: [{
            type: String,
            required: [true, 'Please enter a permission'],
            lowercase: true,
        }]
}, { timestamps: true });
exports.AdminModel = (0, mongoose_1.model)('Admin', adminSchema);
