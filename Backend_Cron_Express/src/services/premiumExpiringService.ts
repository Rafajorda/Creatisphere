import axios from 'axios';
import { getExpiringPremiumUsers } from '../repo/GetPremiumsExpiring';
import { UpdateExpiringPremiumUsers } from '../repo/UpdateExpiringPremiumUsers';
import { AppError } from '../utils/AppError';

export async function checkPremiumsExpiring() {
    const expiringPremiumUsers = await getExpiringPremiumUsers();
    console.log("expiringPremiumUsers", expiringPremiumUsers);
    if (expiringPremiumUsers.length > 0) {
        for (const user of expiringPremiumUsers) {
            try {
                console.log(`Actualizando notificación de expiración para el usuario ${user.user.id}`);
                UpdateExpiringPremiumUsers(user.user.id);
                await axios.post('http://localhost:4000/api/notifications/Expiring', { userId: user.user.profile?.username });
                console.log(`Notificación enviada al usuario ${user.id}`);
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