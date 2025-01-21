const dotenv = require('dotenv');

// Cargar variables de entorno desde .env
dotenv.config();

module.exports = {
  SPRING_BACKEND_URL: process.env.SPRING_BACKEND_URL,
  EXPRESS_BACKEND_URL: process.env.EXPRESS_BACKEND_URL,
  PORT: process.env.PROXY_PORT || 4000,
};