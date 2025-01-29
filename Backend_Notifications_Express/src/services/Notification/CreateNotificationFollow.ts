import PrismaCreateNotification from "../../repo/Notification/PrismaCreateNotification";
import { User,Profile } from "@prisma/client";
import { AppError } from "../../utils/AppError";
export default async function CreateNotificationFollow(
    following: User & { profile: Profile },
    followed: User & { profile: Profile },
){ 
    try{
        const followingUsername = following.profile.username;
        const  message =  `${followingUsername} is now following you' `;
        const newNotification = await PrismaCreateNotification( followed.id,message,"bell",false);
        return newNotification;
    }catch(err){
         if (err instanceof Error) {
                   throw new AppError(err.message, 500);
               } else {
                   throw new AppError(String(err), 500);
               }
    }
};
