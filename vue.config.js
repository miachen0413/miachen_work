// const path = require("path")
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ?
    '/miachen_work/' : '/',
  configureWebpack: {
    plugins: [
      new CopyWebpackPlugin({
        patterns: [{
          from: "./src/assets",
          to: "./src/assets"
        }, ]
      })
    ]
  }

}