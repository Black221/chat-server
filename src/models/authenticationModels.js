"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = exports.deliverer = exports.users = void 0;
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    role: { type: String, required: true },
    phoneNumber: { type: String, required: true, unique: true }
});
const DelivererSchema = new mongoose_1.Schema({
    id: mongoose_1.Schema.Types.ObjectId
});
const ClientSchema = new mongoose_1.Schema({
    id: mongoose_1.Schema.Types.ObjectId
});
// mongoose.plugin(muv)
exports.users = (0, mongoose_1.model)('users', UserSchema);
exports.deliverer = (0, mongoose_1.model)('deliverer', DelivererSchema);
exports.client = (0, mongoose_1.model)('client', ClientSchema);
