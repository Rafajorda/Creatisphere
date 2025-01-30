import express from 'express';
import { checkPremiumExpirationController } from '../controllers/premiumController';

const router = express.Router();

// Ruta que recibirá las notificaciones de expiración
router.post('/expiring', checkPremiumExpirationController);

export default router;