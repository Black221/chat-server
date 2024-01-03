import { User, UserModel } from "@models/user.model";
import { Schema, Types } from "mongoose";

export default class UserService implements User {

    // public _id: Schema.Types.ObjectId;
    public _id: Schema.Types.ObjectId | Types.ObjectId | string;
    public username: string;
    public password: string;

    constructor(user: User) {
        this._id = user._id;
        this.username = user.username;
        this.password = user.password;
    }

    public static async getUsers(): Promise<User[]> {
        return UserModel.find();
    }

    public static async getUser(_id: Schema.Types.ObjectId | Types.ObjectId | string): Promise<User | null> {
        return UserModel.findById(_id);
    }

    public static async getUserByUsername(username: string): Promise<User | null> {
        return UserModel.findOne({ username: username });
    }

    public static async getRandomExpert(): Promise<User | null> {
        return UserModel.findOne({ role: 'expert' });
    }

    public static async updateUserRole(user: User, role: string): Promise<void> {
        await UserModel.updateOne({ _id: user._id }, { role: role });
    }

    public static async updatePhoneNumber(user: User, phoneNumber: string): Promise<void> {
        await UserModel.updateOne({ _id: user._id }, { phoneNumber: phoneNumber });
    }

    public static async updatePassword(user: User, password: string): Promise<void> {
        await UserModel.updatePassword(user, password);
    }

    public static async updateUsername(user: User, username: string): Promise<void> {
        await UserModel.updateOne({ _id: user._id }, { username: username });
    }

    public static async deleteUser(user: User): Promise<void> {
        await UserModel.deleteOne({ _id: user._id });
    }
}