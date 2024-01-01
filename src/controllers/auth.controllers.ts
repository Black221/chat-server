import { Request, Response } from 'express';
import { UserModel } from '../models';


export const createUser = async (req: Request, res: Response) => {

    const { firstName, lastName, password, phoneNumber} = req.body;
    try {
        const user = await UserModel.create({ firstName, lastName, password, phoneNumber});
        return res.status(201).json({ user: user._id });
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
}

export const getUser = async (req: Request, res: Response) => {
    try {
        const user = await UserModel.find();
        return res.status(200).json({ user });
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
}

export const getUserById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const user = await UserModel.findById(id);
        if (user) {
            return res.status(200).json({ user });
        }
        return res.status(404).json({ message: "User not found!" });
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
}

export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { firstName, lastName, password, phoneNumber} = req.body;

    try {
        const user = await UserModel.findByIdAndUpdate(id, { firstName, lastName, password, phoneNumber});
        if (user) {
            const updated = { ...user, firstName, lastName, password, phoneNumber};
            return res.status(200).json({ user: updated });
        }
        return res.status(404).json({ message: "User not found!" });
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const deleted = await UserModel.findByIdAndDelete(id);
        if (deleted) {
            return res.status(200).json({ user: deleted });
        }
        throw new Error("User not found!");
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
}