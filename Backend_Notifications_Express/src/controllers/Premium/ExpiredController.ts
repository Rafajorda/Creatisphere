import { Profile, User } from '@prisma/client';
import { Request, Response } from 'express';
import FindUserService from '../../services/User/FindUserService';
import CreateNotificationExpired from '../../services/Notification/CreateNotificationExpired';
import { AppError } from '../../utils/AppError';


export const Expired = async (req: Request, res: Response): Promise<void> => {
    try {
     const { userId } = req.body;

    if (!userId) {
        res.status(400).json({ message: 'Required data missing: userId' });
        return;
    }
       
    const user = await FindUserService(userId) as User & { profile: Profile };

    if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
    }

    const newNotification = await CreateNotificationExpired(user);
       
    res.status(201).json(newNotification);

    } catch (err) {
        if (err instanceof AppError) {
            res.status(err.statusCode).json({ message: err.message });
        } else {
            console.error('Unexpected error in Likes:', err);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};  


