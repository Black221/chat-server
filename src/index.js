"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const node_http_1 = require("node:http");
const socket_io_1 = require("socket.io");
const jwtMiddleware_1 = require("./middlewares/jwtMiddleware");
const routes_1 = require("./routes");
dotenv.config({ path: '../config/.env' });
let PORT = parseInt(process.env.PORT, 10);
if (!process.env.PORT) {
    PORT = 3000;
}
const app = (0, express_1.default)();
const server = (0, node_http_1.createServer)(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
    }
});
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static('public'));
app.use('/api/auth', routes_1.authRoutes);
app.use('/api/clients', routes_1.clientRoutes);
app.use('/api/deliverers', routes_1.delivererRoutes);
app.use('/api/commands', routes_1.commandRoutes);
app.use('/api/chats', routes_1.chatRoutes);
app.use('/api/clients', jwtMiddleware_1.JWTMiddleware, routes_1.clientRoutes);
app.use('/api/deliverers', jwtMiddleware_1.JWTMiddleware);
app.use('/api/commands', jwtMiddleware_1.JWTMiddleware);
app.use('/api/chats', jwtMiddleware_1.JWTMiddleware);
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('message', ({ id, text, time }) => {
        io.emit('message', {
            id,
            sender: socket.id,
            text, time
        });
    });
});
app.post('/auth', (req, res) => {
    res.send('Hello world!');
});
server.listen(4444, () => {
    console.log(`Listening on port ${4444}`);
});
