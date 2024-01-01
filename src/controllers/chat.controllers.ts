import { Request, Response } from 'express';
import { ChatModel } from '../models';

export const createChat = async (req: Request, res: Response) => {

    const { name, description, users, messages } = req.body;
    try {
        const chat = await ChatModel.create({ name, description, users, messages });
        return res.status(201).json({ chat: chat._id });
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
}

export const getChat = async (req: Request, res: Response) => {
    try {
        const chat = await ChatModel.find();
        return res.status(200).json({ chat });
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
}

export const getChatById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const chat = await ChatModel.findById(id);
        if (chat) {
            return res.status(200).json({ chat });
        }
        return res.status(404).json({ message: "Chat not found!" });
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
}

export const updateChat = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, description, users, messages } = req.body;

    try {
        const chat = await ChatModel.findByIdAndUpdate(id, { name, description, users, messages });
        if (chat) {
            const updated = { ...chat, name, description, users, messages };
            return res.status(200).json({ chat: updated });
        }
        return res.status(404).json({ message: "Chat not found!" });
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
}

export const deleteChat = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const deleted = await ChatModel.findByIdAndDelete(id);
        if (deleted) {
            return res.status(200).json({ chat: deleted });
        }
        return res.status(404).json({ message: "Chat not found!" });
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
}