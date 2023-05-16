const path = require("path")
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ?
    '/' : '/',
  configureWebpack: {
    resolve:{
      alias:{
        "~": path.resolve(__dirname,"")
      }
    },
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