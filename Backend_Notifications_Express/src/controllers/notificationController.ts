import { PrismaClient, Profile, User } from '@prisma/client';
import { Request, Response } from 'express';
import FindUserService from '../services/User/FindUserService';
import findProduct from '../services/Product/FindProductService';
import CreateNotification from '../services/Notification/CreateNotificationBell';
import { AppError } from '../utils/AppError';

const prisma = new PrismaClient();

export const Likes = async (req: Request, res: Response): Promise<void> => {
    try {
     const { username, productId } = req.body;

    if (!username || !productId) {
        res.status(400).json({ message: 'Required data missing: username or productId' });
        return;
    }
       
    const user = await FindUserService(username);
    
    const product = await findProduct(productId);

    const newNotification = await CreateNotification(user as User & { profile: Profile }, product);
   
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