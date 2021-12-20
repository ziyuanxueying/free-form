import path from 'path'
const resolve = dir => path.join(__dirname, dir)

module.exports = {

  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("@request", resolve("src/tools/request.js"))
  }
}
  