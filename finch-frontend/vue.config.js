const { defineConfig } = require("@vue/cli-service");
require('dotenv').config();

module.exports = defineConfig({
  transpileDependencies: [], // ✅ Must be an array, not boolean
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  css: {
    extract: true,
    sourceMap: true
  },
  configureWebpack: {
    optimization: {
      splitChunks: {
        chunks: 'all'
      }
    }
  }
});
