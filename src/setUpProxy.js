const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
    app.use(
        "/ws",
        createProxyMiddleware({ target: "http://localhost:8080", ws: true,
            onProxyReq: (proxyReq, req, res) => {
                // 여기서 원하는 헤더를 추가합니다.
                proxyReq.setHeader("user", "dev");
            }
        })

    );
};