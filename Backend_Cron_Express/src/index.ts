import express from 'express';
import routes from './routes/routes';
import { checkPremiumExpirationController } from './controllers/premiumController';
import './jobs/cronJobs'; 
const app = express();
const port = 3002;

app.use(express.json()); // Para manejar JSON en las solicitudes


app.get('/checkpremiumexpiration', checkPremiumExpirationController);
// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});