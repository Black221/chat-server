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
exports.deleteClient = exports.updateClient = exports.getClientById = exports.getClient = exports.createClient = void 0;
const models_1 = require("../models");
const createClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const { latitude, longitude } = req.body;
    try {
        const client = yield models_1.ClientModel.create({ user: userId, position: { latitude, longitude } });
        return res.status(201).json({ client: client._id });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.createClient = createClient;
const getClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = yield models_1.ClientModel.find();
        return res.status(200).json({ client });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.getClient = getClient;
const getClientById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const client = yield models_1.ClientModel.findById(id);
        if (client) {
            return res.status(200).json({ client });
        }
        return res.status(404).json({ message: "Client not found!" });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.getClientById = getClientById;
const updateClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { latitude, longitude } = req.body;
    try {
        const client = yield models_1.ClientModel.findByIdAndUpdate(id, { position: { latitude, longitude } });
        if (client) {
            const updated = Object.assign(Object.assign({}, client), { position: { latitude, longitude } });
            return res.status(200).json({ client: updated });
        }
        return res.status(404).json({ message: "Client not found!" });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.updateClient = updateClient;
const deleteClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deleted = yield models_1.ClientModel.findByIdAndDelete(id);
        if (deleted) {
            return res.status(200).json({ client: deleted });
        }
        return res.status(404).json({ message: "Client not found!" });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.deleteClient = deleteClient;
