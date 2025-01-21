const { createProxyMiddleware } = require('http-proxy-middleware');
const { SPRING_BACKEND_URL, EXPRESS_BACKEND_URL } = require('../config');

const configureProxies = (app) => {
  // Validar si las variables de entorno necesarias están configuradas
  if (!SPRING_BACKEND_URL || !EXPRESS_BACKEND_URL) {
    throw new Error('Faltan variables de entorno: SPRING_BACKEND_URL o EXPRESS_BACKEND_URL');
  }

  // Manejar errores de proxy
  const onError = (err, req, res) => {
    console.error(`Error en el proxy para ${req.url}:`, err.message);
    res.status(500).json({ error: 'Hubo un problema al procesar la solicitud' });
  };

  // Proxy para el backend de Spring Boot (pagos)
  app.use(
    '/api/payments',
    createProxyMiddleware({
      target: SPRING_BACKEND_URL, // URL del backend de Spring Boot
      changeOrigin: true,
      pathRewrite: {
        '^/': '/api/', // Añade /api/ al principio de la URL
      },
      onError, // Manejo de errores
    })
  );

  // Proxy para el backend de Express (notificaciones)
  app.use(
    '/api/notifications',
    createProxyMiddleware({
      target: EXPRESS_BACKEND_URL, // URL del backend de Express
      changeOrigin: true,
      pathRewrite: {
        '^/': '/api/', // Añade /api/ al principio de la URL
      },
      onError, // Manejo de errores
    })
  );
};

module.exports = { configureProxies };