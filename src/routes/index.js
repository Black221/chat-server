"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatRoutes = exports.delivererRoutes = exports.commandRoutes = exports.clientRoutes = exports.authRoutes = void 0;
var auth_routes_1 = require("./auth.routes");
Object.defineProperty(exports, "authRoutes", { enumerable: true, get: function () { return __importDefault(auth_routes_1).default; } });
var client_routes_1 = require("./client.routes");
Object.defineProperty(exports, "clientRoutes", { enumerable: true, get: function () { return __importDefault(client_routes_1).default; } });
var command_routes_1 = require("./command.routes");
Object.defineProperty(exports, "commandRoutes", { enumerable: true, get: function () { return __importDefault(command_routes_1).default; } });
var deliverer_routes_1 = require("./deliverer.routes");
Object.defineProperty(exports, "delivererRoutes", { enumerable: true, get: function () { return __importDefault(deliverer_routes_1).default; } });
var chat_routes_1 = require("./chat.routes");
Object.defineProperty(exports, "chatRoutes", { enumerable: true, get: function () { return __importDefault(chat_routes_1).default; } });
