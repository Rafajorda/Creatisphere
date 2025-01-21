const express = require('express');
const cors = require('cors');
const { configureProxies } = require('./middlewares/proxyConfig');
const { PORT } = require('./config');

const app = express();

// Configurar CORS
app.use(cors());

// Configurar proxies
configureProxies(app);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor Proxy escuchando en el puerto ${PORT}`);
});