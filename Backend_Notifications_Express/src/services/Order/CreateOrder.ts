import { Order, OrderLine } from "@prisma/client";
import CreateNotificationOrder from "../Notification/Create/CreateNotificationOrder";
import CreateEmailOrder from "../Order/CreateEmailOrder";
import { AppError } from "../../utils/AppError";
export default async function CreateOrder(
    order: Order & { orderLines: OrderLine[] }
){
    try{
        const ok = CreateEmailOrder(order);
        if (await ok){
            const newNotification = await CreateNotificationOrder(order);
            return newNotification;
        } else {
            throw new AppError("Error sending email", 500);
        }
    } catch(err) {
         if (err instanceof Error) {
            throw new AppError(err.message, 500);
        } else {
            throw new AppError("Unexpected error in CreateOrder", 500);
        }
    }
}
