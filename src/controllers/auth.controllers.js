"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUserById = exports.getUser = exports.createUser = void 0;
const models_1 = require("../models");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, password, phoneNumber } = req.body;
    try {
        const user = yield models_1.UserModel.create({ firstName, lastName, password, phoneNumber });
        return res.status(201).json({ user: user._id });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.createUser = createUser;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield models_1.UserModel.find();
        return res.status(200).json({ user });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.getUser = getUser;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield models_1.UserModel.findById(id);
        if (user) {
            return res.status(200).json({ user });
        }
        return res.status(404).json({ message: "User not found!" });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.getUserById = getUserById;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { firstName, lastName, password, phoneNumber } = req.body;
    try {
        const user = yield models_1.UserModel.findByIdAndUpdate(id, { firstName, lastName, password, phoneNumber });
        if (user) {
            const updated = Object.assign(Object.assign({}, user), { firstName, lastName, password, phoneNumber });
            return res.status(200).json({ user: updated });
        }
        return res.status(404).json({ message: "User not found!" });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deleted = yield models_1.UserModel.findByIdAndDelete(id);
        if (deleted) {
            return res.status(200).json({ user: deleted });
        }
        throw new Error("User not found!");
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.deleteUser = deleteUser;
