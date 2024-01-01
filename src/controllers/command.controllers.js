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
exports.deleteCommand = exports.updateCommand = exports.getCommandById = exports.getCommand = exports.createCommand = void 0;
const models_1 = require("../models");
const createCommand = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { delivererId, clientId } = req.params;
    const { price, position } = req.body;
    try {
        const command = yield models_1.CommandModel.create({ deliverer: delivererId, client: clientId, price, position, status: "pending" });
        return res.status(201).json({ command: command._id });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.createCommand = createCommand;
const getCommand = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const command = yield models_1.CommandModel.find();
        return res.status(200).json({ command });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.getCommand = getCommand;
const getCommandById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const command = yield models_1.CommandModel.findById(id);
        if (command) {
            return res.status(200).json({ command });
        }
        return res.status(404).json({ message: "Command not found!" });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.getCommandById = getCommandById;
const updateCommand = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { price, position } = req.body;
    try {
        const command = yield models_1.CommandModel.findByIdAndUpdate(id, { price, position });
        if (command) {
            const updated = Object.assign(Object.assign({}, command), { price, position });
            return res.status(200).json({ command: updated });
        }
        return res.status(404).json({ message: "Command not found!" });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.updateCommand = updateCommand;
const deleteCommand = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deleted = yield models_1.CommandModel.findByIdAndDelete(id);
        if (deleted) {
            return res.status(200).json({ command: deleted });
        }
        return res.status(404).json({ message: "Command not found!" });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.deleteCommand = deleteCommand;
