import PrismaCreateNotification from "../../repo/Notification/PrismaCreateNotification";
import { User, Profile, Product } from "@prisma/client";
export default async function CreateNotificationLike(
    user: User & { profile: Profile },
    product: Product,
){ 
    try{
        const usernames = user.profile.username;
        const  message =  `${usernames} liked your '${product?.name}' `;
        const newNotification = await PrismaCreateNotification( product.userId,message,"bell",false);
        return newNotification;
    }catch(err){
        if (err instanceof Error) {
            throw new Error(err.message);
        } else {
            throw new Error(String(err));
        }
    }
};
