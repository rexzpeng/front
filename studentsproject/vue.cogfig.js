const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  lintOnSave: false,
  productionSourceMap: false,
  publicPath: '/',
  configureWebpack() {
    return {
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './src'),
          public: path.resolve(__dirname, './public'),
          config: path.resolve(__dirname, './config'),
        },
      },
    }
  },
}