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
exports.login = exports.register = void 0;
const authenticationModels_1 = require("../models/authenticationModels");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    yield authenticationModels_1.users.create(body)
        .then((user) => {
        if (user.role === 'client') {
            authenticationModels_1.client.create({ userId: user._id });
        }
        if (user.role === 'deliverer') {
            authenticationModels_1.deliverer.create({ userId: user._id });
        }
    });
});
exports.register = register;
const login = (req, res) => {
};
exports.login = login;
