// /jobs/cronJobs.ts
import cron from 'node-cron';
import { AppError } from '../utils/AppError';
import { checkPremiumExpirationController } from '../controllers/premiumController';

// Esta tarea cron se ejecutará cada 3 minutos (para pruebas)
cron.schedule('0 */6 * * *', async () => {
  console.log('Ejecutando verificación de expiración de Premium...');
  try {
    await checkPremiumExpirationController();
  } catch (error) {
    if (error instanceof Error) {
      throw new AppError(error.message, 500);
    } else {
      throw new AppError(String(error), 500);
    }
  }
});
