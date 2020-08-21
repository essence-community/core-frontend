/* eslint-disable @typescript-eslint/no-var-requires */
const {createProxyMiddleware} = require("http-proxy-middleware");

let proxyConfig = null;

try {
    if (process.env.PROXY) {
        proxyConfig = JSON.parse(process.env.PROXY);
    }
} catch (err) {
    console.warn("PROXY environment not set", err);
}

// eslint-disable-next-line max-statements
module.exports = function (app) {
    if (proxyConfig) {
        proxyConfig.forEach((config) => {
            app.use(config.path, createProxyMiddleware(config.options));
        });
    } else {
        // Local
        app.use("/api", createProxyMiddleware({changeOrigin: true, target: "http://localhost:9020/"}));
        app.use("/api_module", createProxyMiddleware({changeOrigin: true, target: "http://localhost:9020/"}));
        app.use(
            "/notification",
            createProxyMiddleware({changeOrigin: true, target: "http://localhost:9020/", ws: true}),
        );
    }
};
