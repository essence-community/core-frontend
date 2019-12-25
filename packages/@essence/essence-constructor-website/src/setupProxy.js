const proxy = require("http-proxy-middleware");

let proxyConfig = null;

try {
    if (process.env.PROXY) {
        proxyConfig = JSON.parse(process.env.PROXY);
    }
} catch (err) {
    console.warn("PROXY environment not set", err);
}

// eslint-disable-next-line max-statements
module.exports = function(app) {
    if (proxyConfig) {
        proxyConfig.forEach((config) => {
            app.use(proxy(config.path, config.options));
        });
    } else {
        // Local
        app.use(proxy("/api", {changeOrigin: true, target: "http://localhost:9020/"}));
        app.use(proxy("/api_module", {changeOrigin: true, target: "http://localhost:9020/"}));
        app.use(proxy("/notification", {changeOrigin: true, target: "http://localhost:9020/", ws: true}));
    }
};
