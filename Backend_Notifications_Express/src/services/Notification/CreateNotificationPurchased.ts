import PrismaCreateNotification from "../../repo/Notification/PrismaCreateNotification";
import { User, Profile, Premium } from "@prisma/client";
import { AppError } from "../../utils/AppError";
export default async function CreateNotificationPurchased(
    user: User & { profile: Profile } & { premium: Premium },
){ 
    try{
        const date = user.premium.endDate;
        const usernames = user.profile.username;
        const  message =  `thank you ${usernames} for subscribing to our premium program, your subscription will end on ${date}`;
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
