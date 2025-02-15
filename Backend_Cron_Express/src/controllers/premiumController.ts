import { checkPremiumsExpired } from '../services/premiumExpiredService';
import { checkPremiumsExpiring } from '../services/premiumExpiringService';  // Importamos la lógica del service
import { AppError } from '../utils/AppError';
export async function checkPremiumExpirationController() {
  try {
    console.log('Verificando la expiración de Premium...');
    await checkPremiumsExpiring();
    await checkPremiumsExpired(); 
    console.log('Verificación de expiración de Premium completada.');
  } catch (error) {
    if (error instanceof Error) {
      throw new AppError(error.message, 500);
    }
  }
}