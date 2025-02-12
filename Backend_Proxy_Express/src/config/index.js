const dotenv = require('dotenv');

// Cargar variables de entorno desde .env
dotenv.config();

module.exports = {
  URL_PROXY: process.env.URL_PROXY,
  PORT_PROXY: process.env.PORT_PROXY || 8000,
  URL_SPRING: process.env.URL_SPRING,
  PORT_SPRING: process.env.PORT_SPRING,
  URL_EXPRESS: process.env.URL_EXPRESS,
  PORT_EXPRESS: process.env.PORT_EXPRESS
};