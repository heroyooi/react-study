const os = require('os');
const dotenv = require('dotenv');
const express = require('express');
const next = require('next');
const proxy = require('http-proxy-middleware');
const compression = require('compression');
const cors = require('cors');

dotenv.config();

const port = parseInt(process.env.PORT, 10) || 3000;
const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handle = app.getRequestHandler();

const apiProxyOpts = {
  target: 'http://192.168.8.188:8080',
  proxyTimeout: 35,
  timeout: 30,
  logLevel: 'error',
  changeOrigin: true,
  secure: true
};

app.prepare().then(() => {
  const server = express();

  function shouldCompress(req, res) {
    if (req.headers['x-no-compression']) {
      return false;
    }

    return compression.filter(req, res);
  }

  server.disable('x-powered-by');
  server.use(compression({ filter: shouldCompress }));
  server.use(cors());
  server.set('trust proxy', 'loopback');

  server.use('/api/*', proxy(apiProxyOpts));

  server.get('/svc/system/environment', function(req, res) {
    const env = {
      apiProxyUrl: process.env.API_PROXY_URL,
      canonicalUrl: process.env.CANONICAL_URL,
      domain: process.env.DOMAIN,
      environment: process.env.ENVIRONMENT,
      nodeEnv: process.env.NODE_ENV
    };

    console.info(env);
    res.status(200);
    res.send(env);
  });

  server.get('/svc/system/now', function(req, res) {
    const toDay = new Date();

    res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.header('Pragma', 'no-cache');
    res.header('Expires', 0);
    res.send(`${toDay.getFullYear()}-${toDay.getMonth() + 1}-${toDay.getDate()}`);
  });

  server.get('/svc/system/healthcheck', function(req, res) {
    res.status(200);
    res.send({
      platform: os.platform(),
      freemem: os.freemem(),
      hostname: os.hostname(),
      loadavg: os.loadavg(),
      uptime: os.uptime()
    });
  });

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
