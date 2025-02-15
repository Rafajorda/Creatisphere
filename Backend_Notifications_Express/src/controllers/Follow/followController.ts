import { Profile, User } from '@prisma/client';
import { Request, Response } from 'express'; 
import CreateNotificationFollow from '../../services/Notification/Create/CreateNotificationFollow';
import FindUserService from '../../services/User/FindUserService';
import { AppError } from '../../utils/AppError';


export const Follow = async (req: Request, res: Response): Promise<void> => {
    try{
    const { following,followed  } = req.body;


    if (!following || !followed) {
        res.status(400).json({ message: 'Required data missing: username or productId' });
        return;
    }
       
    const followinguser = await FindUserService(following);

    const followeduser = await FindUserService(followed);

    const newNotification = await CreateNotificationFollow(followinguser as User & { profile: Profile }, followeduser as User & { profile: Profile });
   
    res.status(201).json(newNotification);

    }catch (err) {
        if (err instanceof AppError) {
            res.status(err.statusCode).json({ message: err.message });
        } else {
            console.error('Unexpected error in Likes:', err);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}