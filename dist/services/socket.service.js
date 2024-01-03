"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
class Socket {
    constructor() {
    }
    static init(serve) {
        if (!Socket.instance) {
            Socket.instance = new Socket();
            Socket.connect(serve);
        }
    }
    static getInstance() {
        return Socket.instance;
    }
    static connect(serve) {
        Socket.socket = new socket_io_1.Server(serve, {
            cors: {
                origin: '*',
            }
        });
    }
    static getSocket() {
        return Socket.socket;
    }
}
exports.default = Socket;
