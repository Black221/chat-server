"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const authenticationControllers_1 = require("../controllers/authenticationControllers");
exports.routes = (0, express_1.Router)();
exports.routes.post('register', authenticationControllers_1.register);
exports.routes.post('login', authenticationControllers_1.login);
