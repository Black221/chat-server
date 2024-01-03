import { Message, MessageDTO, MessageModel } from "@models/message.model";
import { User } from "@models/user.model";
import { Discussion } from "@models/discussion.model";
import { Schema, Types } from "mongoose";
import SocketService  from '@services/socket.service';
import { Server } from "http";



export default class MessageService implements Message {

    public _id: Schema.Types.ObjectId | Types.ObjectId | string
    public text: string;
    public reply_to?: Message;
    public date: Date;
    public sender: User;
    public receiver: Discussion;


    constructor(message: Message){
        this._id = message._id;
        this.text = message.text;
        this.reply_to = message.reply_to;
        this.date = message.date;
        this.sender = message.sender;
        this.receiver = message.receiver;
    }

    public static async getMessages(): Promise<Message[]> {
        return MessageModel.find();
    }

    public static async getMessage(_id: Schema.Types.ObjectId | Types.ObjectId | string): Promise<Message | null> {
        return MessageModel.findById(_id).populate('sender').populate('receiver').populate('reply_to');
    }

    public static async getDiscussionMessages(receiver: Schema.Types.ObjectId | Types.ObjectId | string): Promise<Message[]> {
        return MessageModel.find({ receiver: receiver }).populate('sender').populate('reply_to')
    }

    public static async getLatestMessage(receiver: Schema.Types.ObjectId | Types.ObjectId | string): Promise<Message[] | null> {
        return MessageModel.find({ receiver: receiver }).populate('sender').populate('reply_to').sort({ date: -1 }).limit(1);
    }

    // public static async replyMessage(message: Message, reply: Message): Promise<Message> {
        
    // }

    public static async createMessage(message: MessageDTO): Promise<Message> {
        const socketService = SocketService.getSocket();
        socketService.sockets.in(message.receiver).emit('new message', { message });
        return MessageModel.create(message);
    }

    public static async deleteMessage(message: Message): Promise<void> {
        await MessageModel.deleteOne({ _id: message._id });
    }
}