// /jobs/cronJobs.ts
import cron from 'node-cron';
import { checkPremiumExpirationController } from '../controllers/premiumController';

// Esta tarea cron se ejecutará cada 3 minutos (para pruebas)
cron.schedule('* * * * *', async () => {
  console.log('Ejecutando verificación de expiración de Premium...');
  try {
    await checkPremiumExpirationController();
  } catch (error) {
    console.error('Error al ejecutar la verificación desde el cron job:', error);
  }
});
