const http = require('http');
const httpProxy = require('http-proxy');
const { 
    URL_PROXY, 
    PORT_PROXY, 
    URL_SPRING, 
    PORT_SPRING,
    URL_EXPRESS, 
    PORT_EXPRESS 
} = require('./config');

const proxy = httpProxy.createProxyServer({
    changeOrigin: true,
    secure: false
});

const routes = {
    '/api/payment': {
        target: URL_SPRING,
        port: PORT_SPRING
    },
    '/api/notifications': {
        target: URL_EXPRESS,
        port: PORT_EXPRESS
    }
};

proxy.on('proxyReq', (proxyReq, req, res) => {
    const route = Object.keys(routes).find(path => req.url.startsWith(path));
    const targetConfig = routes[route];
    
    proxyReq.setHeader('origin', 'http://localhost:4000');
    proxyReq.setHeader('host', `localhost:${targetConfig.port}`);
});

proxy.on('proxyRes', (proxyRes, req, res) => {
    delete proxyRes.headers['access-control-allow-origin'];
    proxyRes.headers['access-control-allow-origin'] = 'http://localhost:3000';
});

const server = http.createServer((req, res) => {
    if (req.method === 'OPTIONS') {
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.writeHead(200);
        res.end();
        return;
    }

    const route = Object.keys(routes).find(path => req.url.startsWith(path));
    if (route) {
        console.log(`Redirigiendo a ${routes[route].target}`);
        proxy.web(req, res, { target: routes[route].target });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

server.listen(PORT_PROXY, () => {
    console.log('Proxy server running at ' + URL_PROXY);
});
