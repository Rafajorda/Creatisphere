import { Profile, User } from '@prisma/client';
import { Request, Response } from 'express';
import { AppError } from '../../utils/AppError';
import getAllUsersService from '../../services/User/GetAllUsersService';
import CreateNotificationGeneral from '../../services/Notification/Create/CreateNotificationGeneral';  


export const General = async (req: Request, res: Response): Promise<void> => {
    try {
        const { message} = req.body;

    if (!message) {
        res.status(400).json({ message: 'Required data missing: message' });
        return;
    }
       
    const users = await getAllUsersService()
    
    const newNotification = await CreateNotificationGeneral(users, message);
   
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
