import PrismaCreateNotification from "../../repo/Notification/PrismaCreateNotification";
import { User,Profile } from "@prisma/client";
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
            throw new Error(err.message);
        } else {
            throw new Error(String(err));
        }
    }
};
