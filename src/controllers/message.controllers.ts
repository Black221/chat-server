import DiscussionService from "@/services/discussion.service";
import UserService from "@/services/user.service";
import { MessageDTO } from "@models/message.model";
import MessageService from "@services/Message.service";
import { Request, Response } from "express";
import { Schema } from "mongoose";
import SocketService  from '@services/socket.service';


export const getMessages = async (req: Request, res: Response): Promise<void> => {
    try {
        const messages = await MessageService.getMessages();
        res.status(200).json(messages);
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
}

export const getMessage = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params
        const _id = new Schema.Types.ObjectId(id);
        const message = await MessageService.getMessage(_id);

        res.status(200).json(message);
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
}

export const createMessage = async (req: Request, res: Response): Promise<void> => {
    try {
        const messageDTO: MessageDTO = req.body
        // look for the user in the database
        const sender = await UserService.getUser(messageDTO.sender);
        const receiver = await DiscussionService.getDiscussion(messageDTO.receiver);

        if (!sender || !receiver) {
            res.status(404).json({ message: "User or discussion not found" });
            return;
        }
        if (!messageDTO.date) {
            messageDTO.date = new Date();
        } else if (! (messageDTO.date instanceof Date)) {
            messageDTO.date = new Date(messageDTO.date);
        }
        const message = await MessageService.createMessage(messageDTO);

        res.status(201).json(message);
    } catch (error: any) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
}

export const replyMessage = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params
        const _id = new Schema.Types.ObjectId(id);
        const message = await MessageService.getMessage(_id);

        if (!message) {
            res.status(404).json({ message: "Message not found" });
            return;
        }
        // const reply = await MessageService.replyMessage(message, req.body);
        res.status(201).json({});
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteMessage = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params
        const _id = new Schema.Types.ObjectId(id);
        const message = await MessageService.getMessage(_id);
        
        if (!message) {
            res.status(404).json({ message: "Message not found" });
            return;
        }
        await MessageService.deleteMessage(message);
        res.status(200).json({ message: "Message deleted successfully" });
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
}

