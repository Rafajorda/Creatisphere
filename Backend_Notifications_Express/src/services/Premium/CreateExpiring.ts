import { User, Profile } from "@prisma/client";

import CreateEmailExpiring from "../Premium/CreateEmailExpiring";
import { AppError } from "../../utils/AppError";
import CreateNotificationExpiring from "../Notification/Create/CreateNotificationExpiring";
export default async function CreateExpiring(
  user: User & { profile: Profile },
){
    try{
        const ok = CreateEmailExpiring(user);
        if (await ok){
            const newNotification = await CreateNotificationExpiring(user);
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
