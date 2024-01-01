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
exports.deleteChat = exports.updateChat = exports.getChatById = exports.getChat = exports.createChat = void 0;
const models_1 = require("../models");
const createChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, users, messages } = req.body;
    try {
        const chat = yield models_1.ChatModel.create({ name, description, users, messages });
        return res.status(201).json({ chat: chat._id });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.createChat = createChat;
const getChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const chat = yield models_1.ChatModel.find();
        return res.status(200).json({ chat });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.getChat = getChat;
const getChatById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const chat = yield models_1.ChatModel.findById(id);
        if (chat) {
            return res.status(200).json({ chat });
        }
        return res.status(404).json({ message: "Chat not found!" });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.getChatById = getChatById;
const updateChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, description, users, messages } = req.body;
    try {
        const chat = yield models_1.ChatModel.findByIdAndUpdate(id, { name, description, users, messages });
        if (chat) {
            const updated = Object.assign(Object.assign({}, chat), { name, description, users, messages });
            return res.status(200).json({ chat: updated });
        }
        return res.status(404).json({ message: "Chat not found!" });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.updateChat = updateChat;
const deleteChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deleted = yield models_1.ChatModel.findByIdAndDelete(id);
        if (deleted) {
            return res.status(200).json({ chat: deleted });
        }
        return res.status(404).json({ message: "Chat not found!" });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.deleteChat = deleteChat;
