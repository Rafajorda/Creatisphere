import PrismaCreateNotification from "../../../repo/Notification/PrismaCreateNotification";
import { Product } from "@prisma/client";
import { AppError } from "../../../utils/AppError";

export default async function CreateNotificationDeleted(
    message: string,
    product: Product,
){ 
     try{
          const notificationMessage = `Admins have deleted your product ${product.name} because of the following  reasons: ${message}`;
          const newNotification = await PrismaCreateNotification(product.userId, notificationMessage, "bell", false);
          return newNotification;
     } catch (err) {
          if (err instanceof Error) {
                throw new AppError(err.message, 500);
          } else {
                throw new AppError(String(err), 500);
          }
     }
}
