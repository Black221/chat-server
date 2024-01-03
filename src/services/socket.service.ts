import { Server } from "socket.io";
import http from 'node:http';

interface User {
    socketId: string;
    userId: string;
}

interface Discussion {
    id: string;
    users: Array<User>;
}

export default class Socket {

    private static instance: Socket;
    private io: Server | any;
    private users: Array<User> = [];
    private discussions: Array<Discussion> = [];

    private constructor(server: http.Server) {
        this.io = new Server(server);
        this.connection();
    }

    public static init(server: http.Server): void {
        if (!Socket.instance) {
            Socket.instance = new Socket(server);
        }
    }

    public static getSocket(): Server | any {
        return Socket.instance.io;
    }

    public static getInstances(): Socket {
        return Socket.instance;
    }

    public connection (): void {
        this.io.on('connection', (client: any) => {
            console.log('a user connected');

            client.on('new discussion', (id: string, data: any) => {
                console.log('discussion: ' + id);
                this.io.emit('new discussion', id);
            });

            client.on('new message', (id: string, data: any) => {
                console.log('message: ' + id);
                this.io.emit('new message', id, data);
            });
        
            client.on("identity", ({userId} : { userId: string}) => {
                
                if (!this.users.filter((user) => user.userId === userId).length)
                    this.users.push({ socketId: client.id, userId: userId });

                console.log(this.users)
            });

            client.on("subscribe", ({room, otherUser = []} : {room: string, otherUser : User[]}) => {
                // this.subscribeOtherUser(room, otherUserId);
                client.join(room);
            });

            client.on("unsubscribe", (room: any) => {
                client.leave(room);
            });

            client.on("disconnect", () => {
                this.users = this.users.filter((user) => user.socketId !== client.id);
            });
        });
    }

    private subscribeOtherUser(room: any, otherUserId: any) {
        const userSockets = this.users.filter(
            (user) => user.userId === otherUserId
        );
        userSockets.map((userInfo) => {
            const socketConn = this.io.sockets.connected(userInfo.socketId);
            if (socketConn) {
                socketConn.join(room);
            }
        });
    }
}