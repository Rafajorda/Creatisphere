import PrismaCreateNotification from "../../repo/Notification/PrismaCreateNotification";
import { Order } from "@prisma/client";
import { AppError } from "../../utils/AppError";

export default async function CreateNotificationOrder(
    order: Order,
){ 
     try{
          const message = `Order ${order.id} has been placed`;
          const newNotification = await PrismaCreateNotification(order.userId, message, "email", true);
          return newNotification;
     } catch (err) {
          if (err instanceof Error) {
                throw new AppError(err.message, 500);
          } else {
                throw new AppError(String(err), 500);
          }
     }
}
