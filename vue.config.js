const path = require("path")
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ?
    '/miachen_work/' : '/',
  chainWebpack: config => {
    config.resolve.alias // 添加别名
      .set('@', path.resolve('src'))
      .set('@assets', path.resolve('src/assets'))
      .set('@components', path.resolve('src/components'))
      .set('@views', path.resolve('src/views'))
      .set('@store', path.resolve('src/store'));
  },
  configureWebpack: {
    plugins: [
      new CopyWebpackPlugin({
        patterns: [{
          from: "./src/assets",
          to: "assets"
        }, ]
      })
    ]
  }

}