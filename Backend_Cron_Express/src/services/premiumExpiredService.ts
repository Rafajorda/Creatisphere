import axios from 'axios';
import { AppError } from '../utils/AppError';
import { getExpiredPremiumUsers } from '../repo/GetPremiumsExpired';
import { UpdateExpiredPremiumUsers } from '../repo/UpdateExpiredPremiumUsers';

export async function checkPremiumsExpired() {
    const expiredPremiumUsers = await getExpiredPremiumUsers();
    console.log("expiredPremiumUsers", expiredPremiumUsers);
    if (expiredPremiumUsers.length > 0) {
        for (const user of expiredPremiumUsers) {
            try {
                 UpdateExpiredPremiumUsers(user.user.id);
                 await axios.post('http://localhost:4000/api/notifications/Expired', { userId: user.user.profile?.username });
                console.log(`Notificación enviada al usuario ${user.user.id}`);
                return true;
            } catch (error) {
                if (error instanceof Error) {
                    throw new AppError(error.message, 500);
                } else {
                    throw new AppError(String(error), 500);
                }
                return false;
            }
        }   
    }
}