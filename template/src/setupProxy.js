const proxy = require('http-proxy-middleware');

const filter = function (pathname, req) {
  return pathname.match('^/(api|auth)');
};

module.exports = function (app) {
  app.use(proxy.createProxyMiddleware(filter, { target: 'http://localhost:7001', changeOrigin: true }));
};
