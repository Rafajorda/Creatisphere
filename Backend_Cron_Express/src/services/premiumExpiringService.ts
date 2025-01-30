import axios from 'axios';
import { getExpiringPremiumUsers } from '../repo/GetPremiumsExpiring';
import { UpdateExpiringPremiumUsers } from '../repo/UpdateExpiringPremiumUsers';

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
                console.error(`Error al enviar notificación al usuario ${user.id}:`, error);
                return false;
            }
        }
    }
}