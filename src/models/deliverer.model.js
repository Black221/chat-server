"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DelivererModel = void 0;
const mongoose_1 = require("mongoose");
const delivererSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please enter a user'],
    },
    email: {
        type: String,
        lowercase: true,
    },
    dateOfBirth: {
        type: String,
        required: [true, 'Please enter a date of birth'],
        lowercase: true,
    },
    placeOfBirth: {
        type: String,
        required: [true, 'Please enter a place of birth'],
        lowercase: true,
    },
    cni: {
        type: String,
        required: [true, 'Please enter a cni'],
        lowercase: true,
    },
    cniRectoUrl: {
        type: String,
        required: [true, 'Please enter a cni recto url'],
        lowercase: true,
    },
    cniVersoUrl: {
        type: String,
        required: [true, 'Please enter a cni verso url'],
        lowercase: true,
    }
}, { timestamps: true });
exports.DelivererModel = (0, mongoose_1.model)('Deliverer', delivererSchema);
