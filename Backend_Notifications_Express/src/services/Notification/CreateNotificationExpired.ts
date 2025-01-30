import PrismaCreateNotification from "../../repo/Notification/PrismaCreateNotification";
import { User, Profile, Product } from "@prisma/client";
import { AppError } from "../../utils/AppError";
export default async function CreateNotificationExpired(
    user: User & { profile: Profile },
){ 
    try{
        const usernames = user.profile.username;
        const  message =  `${usernames} your Premium subscription has ended' `;
        const newNotification = await PrismaCreateNotification( user.id,message,"bell",false);
        return newNotification;
    }catch(err){
         if (err instanceof Error) {
                   throw new AppError(err.message, 500);
               } else {
                   throw new AppError(String(err), 500);
               }
    }
};
