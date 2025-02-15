import { AppError } from '../../utils/AppError';
import prismaGetUser from '../../repo/User/PrismaGetUser';

export default async function findUser(
    username: string,
){ 
    try {
        if (!username) {
            throw new AppError("Username is required", 400);
        }
      const user = await prismaGetUser(username);
        
        if (!user) {
            throw new AppError("User not found", 404);
        }
   return user;

    } catch (err) {
        if (err instanceof AppError) {
            throw err;
        } else {
            console.error("Unexpected error in findUser:", err);
            throw new AppError("Internal server error", 500);
        }
    }
}