
import { User, UserModel } from '@models/user.model';
import { Schema, Types } from 'mongoose';
import SocketService from '@services/socket.service';

export default class AuthService implements User {

    public _id: string | Schema.Types.ObjectId | Types.ObjectId;
    public username: string;
    public password: string;
    public token: string;

    constructor(_id: string | Schema.Types.ObjectId | Types.ObjectId, username: string, password: string, token: string) {
        this._id = _id;
        this.username = username;
        this.password = password;
        this.token = token;
    }

    public static async login (username: string, password: string): Promise<{ user: User, token : string} | null> {
        const user: User = await UserModel.login(username, password);
        if (user) {
            const socketService = SocketService.getSocket();
            socketService.emit('new connection');
            socketService.emit('identity', user._id);

            const token = await UserModel.generateToken(user._id);
            return {
                user,
                token
            };
        }
        return null;
    }

    public static async logout (): Promise<any> {
        
    }

    public static async register (username: string, password: string): Promise<any> {
        const user = new UserModel({ username, password });
        await user.save();
        if (user) {}

        return user;
    }
}