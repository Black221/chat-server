"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config({ path: './config/.env' });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const node_http_1 = require("node:http");
const body_parser_1 = __importDefault(require("body-parser"));
const socket_service_1 = __importDefault(require("./services/socket.service"));
const app_routes_1 = __importDefault(require("@routes/app.routes"));
const app = (0, express_1.default)();
const server = (0, node_http_1.createServer)(app);
socket_service_1.default.init(server);
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json(), body_parser_1.default.urlencoded({ extended: true }));
app.use('/api/v1', app_routes_1.default);
const io = socket_service_1.default.getSocket();
io.on('connection', function (socket) {
});
const PORT = parseInt(process.env.PORT, 10) || 3000;
server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
