import { Request, Response } from 'express';
import { User, UserModel } from '@models/user.model';
import AuthService from '@/services/auth.service';


export const Register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { password, username } = req.body;
        const user = new UserModel({ password, username });
        await user.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

export const RegisterExpert = async (req: Request, res: Response): Promise<void> => {
    try {
        const { password, username } = req.body;
        const user = new UserModel({ password, username, role: 'expert' });
        await user.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

export const Login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, password } = req.body;
        
        const data: {
            user: User,
            token: string
        } | null = await AuthService.login(username, password);

        if (!data) {
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }
        res.status(200).json({ data });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

export const Logout = async (req: Request, res: Response): Promise<void> => {
    try {
        const { token } = req.body;
        // await UserModel.logout(token);
        res.status(200).json({ message: 'User logged out successfully' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}