import { checkPremiumsExpired } from '../services/premiumExpiredService';
import { checkPremiumsExpiring } from '../services/premiumExpiringService';  // Importamos la lógica del service

export async function checkPremiumExpirationController() {
  try {
    console.log('Verificando la expiración de Premium...');
    await checkPremiumsExpiring();
    await checkPremiumsExpired(); 
    console.log('Verificación de expiración de Premium completada.');
  } catch (error) {
    console.error('Error al verificar la expiración de Premium:', error);
  }
}