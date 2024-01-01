import { Request, Response } from 'express';
import { ClientModel } from '../models';

export const createClient = async (req: Request, res: Response) => {

    const { userId } = req.params;
    const { latitude, longitude } = req.body;
    try {
        const client = await ClientModel.create({ user: userId, position: { latitude, longitude } });
        return res.status(201).json({ client: client._id });
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
}

export const getClient = async (req: Request, res: Response) => {
    try {
        const client = await ClientModel.find();
        return res.status(200).json({ client });
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
}

export const getClientById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const client = await ClientModel.findById(id);
        if (client) {
            return res.status(200).json({ client });
        }
        return res.status(404).json({ message: "Client not found!" });
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
}

export const updateClient = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { latitude, longitude } = req.body;

    try {
        const client = await ClientModel.findByIdAndUpdate(id, { position: { latitude, longitude } });
        if (client) {
            const updated = { ...client, position: { latitude, longitude } };
            return res.status(200).json({ client: updated });
        }
        return res.status(404).json({ message: "Client not found!" });
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
}

export const deleteClient = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const deleted = await ClientModel.findByIdAndDelete(id);
        if (deleted) {
            return res.status(200).json({ client: deleted });
        }
        return res.status(404).json({ message: "Client not found!" });
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
}



