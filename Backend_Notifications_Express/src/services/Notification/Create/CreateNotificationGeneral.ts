import PrismaCreateNotification from "../../../repo/Notification/PrismaCreateNotification";
import { User } from "@prisma/client";
import { AppError } from "../../../utils/AppError";

export default async function CreateNotificationGeneral(
    users: User[],
    message: string,
){ 
   
     try{
        const notifications = await Promise.all(
            users.map(user => 
                PrismaCreateNotification(user.id, message, "bell", false)
            )
        );
        return notifications; 
     } catch (err) {
          if (err instanceof Error) {
                throw new AppError(err.message, 500);
          } else {
                throw new AppError(String(err), 500);
          }
     }
}
