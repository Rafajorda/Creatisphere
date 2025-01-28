import PrismaCreateNotificationBell from "../../repo/Notification/PrismaCreateNotificationBell";
import { User, Profile, Product } from "@prisma/client";
export default async function CreateNotification(
    user: User & { profile: Profile },
    product: Product,
){ 
    try{
       
        const newNotification = await PrismaCreateNotificationBell(user, product);
        return newNotification;
    }catch(err){
        if (err instanceof Error) {
            throw new Error(err.message);
        } else {
            throw new Error(String(err));
        }
    }
};
