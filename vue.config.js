const path = require('path')
const resolve = dir => path.join(__dirname, dir)

module.exports = {

  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@utils', resolve('src/utils/index.js'))
      .set('@request', resolve('src/tools/request.js'))
      .set('@store', resolve('src/store'))
  },

  configureWebpack: config => {
    // config.entry = './src/main.ts'
    config.resolve = {
      extensions: ['.ts', '.tsx', '.js', '.vue'],
      alias: {
        '@': resolve('src'),
        '@request': resolve('src/tools/request.js'),
      } 
    }
    config.module.rules.push(
      ...[
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          enforce: 'pre',
          loader: 'tslint-loader'
        },
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
          options: {
            appendTsSuffixTo: [/\.vue$/]
          }
        }
      ],
    )
    //调试JS
    // config.devtool = 'source-map'
    
  },

  // 配置 webpack-dev-server 行为
  devServer: {
    // overlay: { // 让浏览器 overlay 同时显示警告和错误
    //   warnings: true,
    //   errors: true
    // },
    host: 'localhost',
    port: 8086, // 端口号
    https: false, // https:{type:Boolean}
    open: false, // 编译后默认打开浏览器
    // hotOnly: true, // 热更新
    proxy: { 
      '/api': {
        target: 'https://dev-platform.naxions.com',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  },
  css: {
    extract: false // 组件的样式是否另外打包成单独的css文件。默认为true
  },
}
  