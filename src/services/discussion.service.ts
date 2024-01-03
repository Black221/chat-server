import { Discussion, DiscussionDTO, DiscussionModel } from "@models/discussion.model";
import { Message } from "@models/message.model";
import MessageService from "@services/Message.service";
import { User } from "@models/user.model";
import { Schema, Types } from "mongoose";


export default class DiscussionService implements Discussion{

    public _id: Schema.Types.ObjectId | Types.ObjectId | string;
    public users: User[] = [];
    public created_by: User;
    public img: string;
    public name: string;

    constructor(discussion: Discussion){
        this._id = discussion._id;
        this.users = discussion.users;
        this.created_by = discussion.created_by;
        this.img = discussion.img;
        this.name = discussion.name;
    }

    public static async getAllDiscussions(): Promise<Discussion[]> {
        return DiscussionModel.find();
    }

    public static async getDiscussions(user: User): Promise<Discussion[]> {
        return DiscussionModel.find({ users: user });
    }

    public static async getDiscussion(id: Schema.Types.ObjectId | Types.ObjectId | string): Promise<Discussion | null> {
        return DiscussionModel.findById(id);
    }

    public static async getDiscussionMembers(id: Schema.Types.ObjectId | Types.ObjectId | string): Promise<Discussion | null> {
        return DiscussionModel.findById(id).populate('users');
    }

    public static async getDiscussionMessages(id: Schema.Types.ObjectId | Types.ObjectId | string): Promise<Message[]> {
        return MessageService.getDiscussionMessages(id);
    }

    public static async createDiscussion(discussion: DiscussionDTO): Promise<Discussion> {
        return DiscussionModel.create(discussion);
    }

    public static async addUser(discussion: Discussion, user: User): Promise<Discussion | null> {
        return DiscussionModel.findByIdAndUpdate(discussion._id, { $push: { users: user } }, { new: true });
    }

    public static async removeUser(discussion: Discussion, user: User): Promise<Discussion | null> {
        return DiscussionModel.findByIdAndUpdate(discussion._id, { $pull: { users: user } }, { new: true });
    }

    public static async deleteDiscussion(discussion: Discussion): Promise<void> {
        await DiscussionModel.deleteOne({ _id: discussion._id });
    }
}