const { createProxyMiddleware } = require('http-proxy-middleware');
const { SPRING_BACKEND_URL, EXPRESS_BACKEND_URL } = require('../config');

const configureProxies = (app) => {
  // Proxy para el backend de Spring Boot
  app.use(
    '/api/payments',
    createProxyMiddleware({
      target: SPRING_BACKEND_URL,
      changeOrigin: true,
    })
  );

  // Proxy para el backend de Express
  app.use(
    '/api/notifications',
    createProxyMiddleware({
      target: EXPRESS_BACKEND_URL,
      changeOrigin: true,
    })
  );
};

module.exports = { configureProxies };