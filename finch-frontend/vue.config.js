const { defineConfig } = require("@vue/cli-service");
require('dotenv').config();

module.exports = defineConfig({
  lintOnSave: false, // ✅ Disable ESLint during build
  transpileDependencies: [], // ✅ Must be an array
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
