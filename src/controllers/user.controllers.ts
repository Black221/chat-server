import { User, UserModel } from "@models/user.model";
import UserService from "@services/user.service";
import { Request, Response } from "express";
import Mongoose, { Schema } from "mongoose";

export const getUsers = async (req: Request, res: Response) => {
    try {

        const users = await UserService.getUsers();
        res.status(200).json(users);
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
};

export const getUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const _id = new Mongoose.Types.ObjectId(id);
        const user = await UserService.getUser(_id);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json(user);
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
};

export const getRondomExpert = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId } = req.params;
        const user: User | null = await UserService.getUser(userId);
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        
        const expert: User | null = await UserService.getRandomExpert();
        if (!expert) {
            res.status(404).json({ error: 'Expert not found' });
            return;
        }

        res.status(200).json(expert);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

export const updateUserRole = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const _id = new Mongoose.Types.ObjectId(id);
        const user = await UserService.getUser(_id);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        await UserService.updateUserRole(user, req.body.role);
        res.status(200).json({ message: "Role updated successfully" });
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
}

export const updatePhoneNumber = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const _id = new Mongoose.Types.ObjectId(id);
        const user = await UserService.getUser(_id);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        await UserService.updatePhoneNumber(user, req.body.phone_number);
        res.status(200).json({ message: "Phone number updated successfully" });
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
}

export const updatePassword = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const _id = new Mongoose.Types.ObjectId(id);
        const user = await UserService.getUser(_id);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        await UserService.updatePassword(user, req.body.password);
        res.status(200).json({ message: "Password updated successfully" });
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
}