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
exports.deleteDeliverer = exports.updateDeliverer = exports.getDelivererById = exports.getDeliverer = exports.createDeliverer = void 0;
const models_1 = require("../models");
const createDeliverer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const { email, dateOfBirth, placeOfBirth, cni, cniRectoUrl, cniVersoUrl } = req.body;
    try {
        const deliverer = yield models_1.DelivererModel.create({ user: userId, email, dateOfBirth, placeOfBirth, cni, cniRectoUrl, cniVersoUrl });
        return res.status(201).json({ deliverer: deliverer._id });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.createDeliverer = createDeliverer;
const getDeliverer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deliverer = yield models_1.DelivererModel.find();
        return res.status(200).json({ deliverer });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.getDeliverer = getDeliverer;
const getDelivererById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deliverer = yield models_1.DelivererModel.findById(id);
        if (deliverer) {
            return res.status(200).json({ deliverer });
        }
        return res.status(404).json({ message: "Deliverer not found!" });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.getDelivererById = getDelivererById;
const updateDeliverer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { email, dateOfBirth, placeOfBirth, cni, cniRectoUrl, cniVersoUrl } = req.body;
    try {
        const deliverer = yield models_1.DelivererModel.findByIdAndUpdate(id, { email, dateOfBirth, placeOfBirth, cni, cniRectoUrl, cniVersoUrl });
        if (deliverer) {
            const updated = Object.assign(Object.assign({}, deliverer), { email, dateOfBirth, placeOfBirth, cni, cniRectoUrl, cniVersoUrl });
            return res.status(200).json({ deliverer: updated });
        }
        return res.status(404).json({ message: "Deliverer not found!" });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.updateDeliverer = updateDeliverer;
const deleteDeliverer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deleted = yield models_1.DelivererModel.findByIdAndDelete(id);
        if (deleted) {
            return res.status(200).json({ deliverer: deleted });
        }
        return res.status(404).json({ message: "Deliverer not found!" });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.deleteDeliverer = deleteDeliverer;
