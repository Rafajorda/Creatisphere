import { Premium, Profile, User } from '@prisma/client';
import { Request, Response } from 'express';
import FindUserService from '../../services/User/FindUserService';
import { AppError } from '../../utils/AppError';
import CreateNotificationPurchased from '../../services/Notification/Create/CreateNotificationPurchased';


export const purchased = async (req: Request, res: Response): Promise<void> => {
    try {
     const { username, } = req.body;

    if (!username) {
        res.status(400).json({ message: 'Required data missing: username' });
        return;
    }
       
    const user = await FindUserService(username);
    
    const newNotification = await CreateNotificationPurchased(user as User & { profile: Profile }& { premium: Premium });
   
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

