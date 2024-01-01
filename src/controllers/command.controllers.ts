import { Request, Response } from 'express';
import { CommandModel } from '../models';

export const createCommand = async (req: Request, res: Response) => {

    const { delivererId, clientId } = req.params;
    const { price, position} = req.body;
    try {
        const command = await CommandModel.create({ deliverer: delivererId, client: clientId, price, position, status: "pending"});
        return res.status(201).json({ command: command._id });
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
}

export const getCommand = async (req: Request, res: Response) => {
    try {
        const command = await CommandModel.find();
        return res.status(200).json({ command });
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
}

export const getCommandById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const command = await CommandModel.findById(id);
        if (command) {
            return res.status(200).json({ command });
        }
        return res.status(404).json({ message: "Command not found!" });
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
}

export const updateCommand = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { price, position} = req.body;

    try {
        const command = await CommandModel.findByIdAndUpdate(id, { price, position});
        if (command) {
            const updated = { ...command, price, position};
            return res.status(200).json({ command: updated });
        }
        return res.status(404).json({ message: "Command not found!" });
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
}

export const deleteCommand = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const deleted = await CommandModel.findByIdAndDelete(id);
        if (deleted) {
            return res.status(200).json({ command: deleted });
        }
        return res.status(404).json({ message: "Command not found!" });
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
}