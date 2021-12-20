const path = require('path')
const resolve = dir => path.join(__dirname, dir)

module.exports = {

  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("@request", resolve("src/tools/request.js"))
  },
  // 配置 webpack-dev-server 行为
  devServer: {
    overlay: { // 让浏览器 overlay 同时显示警告和错误
      warnings: true,
      errors: true
    },
    host: "localhost",
    port: 8080, // 端口号
    https: false, // https:{type:Boolean}
    open: false, // 编译后默认打开浏览器
    hotOnly: true, // 热更新
    proxy: { 
      "/api": {
        target: "http://localhost:8081",
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          "^/api": "/api"
        }
      }
    }
  }
}
  