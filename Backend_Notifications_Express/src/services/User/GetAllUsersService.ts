import prismaGetAllUsers from "../../repo/User/PrismaGetAllUsers";
import { AppError } from "../../utils/AppError";

export default async function getAllUsersService(
){ 
    try {
        const users = await prismaGetAllUsers();
        return users;
    } catch (err) {
        if (err instanceof Error) {
            throw new AppError(err.message, 500);
        } else {
            throw new AppError(String(err), 500);
        }
    }
}
    