import { Request, Response } from 'express';
import {DelivererModel} from '../models';

export const createDeliverer = async (req: Request, res: Response) => {

    const { userId } = req.params;
    const { email, dateOfBirth, placeOfBirth, cni, cniRectoUrl, cniVersoUrl} = req.body;
    try {
        const deliverer = await DelivererModel.create({ user: userId, email, dateOfBirth, placeOfBirth, cni, cniRectoUrl, cniVersoUrl});
        return res.status(201).json({ deliverer: deliverer._id });
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
}

export const getDeliverer = async (req: Request, res: Response) => {
    try {
        const deliverer = await DelivererModel.find();
        return res.status(200).json({ deliverer });
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
}

export const getDelivererById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const deliverer = await DelivererModel.findById(id);
        if (deliverer) {
            return res.status(200).json({ deliverer });
        }
        return res.status(404).json({ message: "Deliverer not found!" });
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
}

export const updateDeliverer = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { email, dateOfBirth, placeOfBirth, cni, cniRectoUrl, cniVersoUrl} = req.body;

    try {
        const deliverer = await DelivererModel.findByIdAndUpdate(id, { email, dateOfBirth, placeOfBirth, cni, cniRectoUrl, cniVersoUrl});
        if (deliverer) {
            const updated = { ...deliverer, email, dateOfBirth, placeOfBirth, cni, cniRectoUrl, cniVersoUrl};
            return res.status(200).json({ deliverer: updated });
        }
        return res.status(404).json({ message: "Deliverer not found!" });
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
}

export const deleteDeliverer = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const deleted = await DelivererModel.findByIdAndDelete(id);
        if (deleted) {
            return res.status(200).json({ deliverer: deleted });
        }
        return res.status(404).json({ message: "Deliverer not found!" });
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
}