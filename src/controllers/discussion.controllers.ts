import { Request, Response } from "express";
import { DiscussionModel, Discussion, DiscussionDTO  } from "@models/discussion.model";
import DiscussionService from "@services/discussion.service";
import UserService  from "@services/user.service";
import { User } from "@models/user.model";
import { Schema, Types } from "mongoose";


export const  getDiscussions = async (req: Request, res: Response): Promise<void> => {
    try {
        const discussions: Discussion[] = await DiscussionService.getAllDiscussions();
        res.status(200).json(discussions);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

export const  getUserDiscussions = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        const user: User | null = await UserService.getUser(id);
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        const discussions: Discussion[] = await DiscussionService.getDiscussions(user);

        res.status(200).json(discussions);

    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

export const  getDiscussion = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const _id = new Schema.ObjectId(id);
        const discussion: Discussion | null = await DiscussionService.getDiscussion(_id);

        if (!discussion) {
            res.status(404).json({ error: 'Discussion not found' });
            return;
        }
        res.status(200).json(discussion);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

export const  getDiscussionMembers = async (req: Request, res: Response): Promise<void> => {
    try {
        let { id } = req.params;
        const _id = new Schema.ObjectId(id);
        const discussion: Discussion | null = await DiscussionService.getDiscussionMembers(_id);

        if (!discussion) {
            res.status(404).json({ error: 'Discussion not found' });
            return;
        }
        res.status(200).json(discussion);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

export const  getDiscussionMessages = async (req: Request, res: Response): Promise<void> => {
    try {
        let { id } = req.params;
        const _id = new Schema.ObjectId(id);
        const messages = await DiscussionService.getDiscussionMessages(_id);

        res.status(200).json(messages);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

export const  createDiscussion = async (req: Request, res: Response): Promise<void> => {
    try {
        const discussionDTO: DiscussionDTO = {
            name: req.body.name,
            img: req.body.img,
            created_by: req.body.created_by,
            users: req.body.users,
        }
        const discussion: Discussion = await DiscussionService.createDiscussion(discussionDTO);
        res.status(200).json(discussion);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

export const  addUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const discussion: Discussion | null = await DiscussionService.addUser(req.body.discussion, req.body.user);
        res.status(200).json(discussion);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

export const  removeUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const discussion: Discussion | null = await DiscussionService.removeUser(req.body.discussion, req.body.user);
        res.status(200).json(discussion);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }

}